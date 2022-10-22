import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListSetupRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListSetupResponse = {
  data: Record<string, any>[];
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number,
  },
};

type CreateSetupRequest = {
  nome: string;
  ativo: boolean;
};

type CreateOrUpdateSetupResponse = {
  message: string;
};

type UpdateSetupRequest = {
  nome?: string;
  ativo?: boolean;
};

export class ManageSetupApiRepository extends HttpClient implements
  ListSetupRepositoryContract,
  CreateSetupRepositoryContract,
  UpdateSetupRepositoryContract,
  DeleteSetupRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListSetupRepositoryContract.Params
  ): Promise<ActionResult<ListSetupRepositoryContract.Response, any>> {
    try {
      const requestParams: ListSetupRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListSetupResponse>('/setups', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((setup) => SetupEntity.createFromRaw(setup)),
        page: meta.current_page,
        pageCount: meta.last_page,
      });
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async create(params: CreateSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateSetupRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.post<CreateOrUpdateSetupResponse>('/setups', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateSetupRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.put<CreateOrUpdateSetupResponse>(`/setups/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse setup');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/setups/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse setup');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
