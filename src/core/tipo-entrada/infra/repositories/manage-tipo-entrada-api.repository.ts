import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListTipoEntradaRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListTipoEntradaResponse = {
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

type CreateTipoEntradaRequest = {
  nome: string;
  ativo: boolean;
};

type CreateOrUpdateTipoEntradaResponse = {
  message: string;
};

type UpdateTipoEntradaRequest = {
  nome?: string;
  ativo?: boolean;
};

export class ManageTipoEntradaApiRepository extends HttpClient implements
  ListTipoEntradaRepositoryContract,
  CreateTipoEntradaRepositoryContract,
  UpdateTipoEntradaRepositoryContract,
  DeleteTipoEntradaRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<ListTipoEntradaRepositoryContract.Response, any>> {
    try {
      const requestParams: ListTipoEntradaRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListTipoEntradaResponse>('/tipos-entrada', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((tipoEntrada) => TipoEntradaEntity.createFromRaw(tipoEntrada)),
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

  async create(params: CreateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateTipoEntradaRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.post<CreateOrUpdateTipoEntradaResponse>('/tipos-entrada', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateTipoEntradaRequest = {
        nome: params.nome,
        ativo: params.ativo,
      };

      await this.client.put<CreateOrUpdateTipoEntradaResponse>(`/tipos-entrada/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse tipo de entrada');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/tipos-entrada/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse tipo de entrada');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
