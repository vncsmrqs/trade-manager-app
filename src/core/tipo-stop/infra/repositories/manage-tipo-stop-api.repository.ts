import { ListTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/list-tipo-stop.repository";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/create-tipo-stop.repository";
import { UpdateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/update-tipo-stop.repository";
import { DeleteTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/delete-tipo-stop.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListTipoStopRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListTipoStopResponse = {
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

type CreateTipoStopRequest = {
  nome: string;
  ativo: boolean;
};

type CreateOrUpdateTipoStopResponse = {
  message: string;
};

type UpdateTipoStopRequest = {
  nome?: string;
  ativo?: boolean;
};

export class ManageTipoStopApiRepository extends HttpClient implements
  ListTipoStopRepositoryContract,
  CreateTipoStopRepositoryContract,
  UpdateTipoStopRepositoryContract,
  DeleteTipoStopRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListTipoStopRepositoryContract.Params
  ): Promise<ActionResult<ListTipoStopRepositoryContract.Response, any>> {
    try {
      const requestParams: ListTipoStopRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListTipoStopResponse>('/tipos-stop', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((tipoStop) => TipoStopEntity.createFromRaw(tipoStop)),
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

  async create(params: CreateTipoStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateTipoStopRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.post<CreateOrUpdateTipoStopResponse>('/tipos-stop', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateTipoStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateTipoStopRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.put<CreateOrUpdateTipoStopResponse>(`/tipos-stop/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse tipo de stop');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteTipoStopRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/tipos-stop/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse tipo de stop');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
