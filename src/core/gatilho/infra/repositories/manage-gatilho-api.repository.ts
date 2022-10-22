import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListGatilhoRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListGatilhoResponse = {
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

type CreateGatilhoRequest = {
  nome: string;
  ativo: boolean;
};

type CreateOrUpdateGatilhoResponse = {
  message: string;
};

type UpdateGatilhoRequest = {
  nome?: string;
  ativo?: boolean;
};

export class ManageGatilhoApiRepository extends HttpClient implements
  ListGatilhoRepositoryContract,
  CreateGatilhoRepositoryContract,
  UpdateGatilhoRepositoryContract,
  DeleteGatilhoRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListGatilhoRepositoryContract.Params
  ): Promise<ActionResult<ListGatilhoRepositoryContract.Response, any>> {
    try {
      const requestParams: ListGatilhoRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListGatilhoResponse>('/gatilhos', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((gatilho) => GatilhoEntity.createFromRaw(gatilho)),
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

  async create(params: CreateGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateGatilhoRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.post<CreateOrUpdateGatilhoResponse>('/gatilhos', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateGatilhoRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.put<CreateOrUpdateGatilhoResponse>(`/gatilhos/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse gatilho');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/gatilhos/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse gatilho');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
