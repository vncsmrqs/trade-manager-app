import { ListLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/list-local-stop.repository";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/create-local-stop.repository";
import { UpdateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/update-local-stop.repository";
import { DeleteLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/delete-local-stop.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListLocalStopRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListLocalStopResponse = {
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

type CreateLocalStopRequest = {
  nome: string;
  ativo: boolean;
};

type CreateOrUpdateLocalStopResponse = {
  message: string;
};

type UpdateLocalStopRequest = {
  nome?: string;
  ativo?: boolean;
};

export class ManageLocalStopApiRepository extends HttpClient implements
  ListLocalStopRepositoryContract,
  CreateLocalStopRepositoryContract,
  UpdateLocalStopRepositoryContract,
  DeleteLocalStopRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListLocalStopRepositoryContract.Params
  ): Promise<ActionResult<ListLocalStopRepositoryContract.Response, any>> {
    try {
      const requestParams: ListLocalStopRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListLocalStopResponse>('/locais-stop', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((localStop) => LocalStopEntity.createFromRaw(localStop)),
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

  async create(params: CreateLocalStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateLocalStopRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.post<CreateOrUpdateLocalStopResponse>('/locais-stop', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateLocalStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateLocalStopRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.put<CreateOrUpdateLocalStopResponse>(`/locais-stop/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse local do stop');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteLocalStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/locais-stop/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse local do stop');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
