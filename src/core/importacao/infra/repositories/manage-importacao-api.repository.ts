import { ListImportacaoRepositoryContract } from "@/core/importacao/data/contracts/list-importacao.repository";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteImportacaoRepositoryContract } from "@/core/importacao/data/contracts/delete-importacao.repository";
import { HttpClient } from "@/core/common/domain/http-client";

type ListImportacaoRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListImportacaoResponse = {
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


export class ManageImportacaoApiRepository extends HttpClient implements
  ListImportacaoRepositoryContract,
  DeleteImportacaoRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListImportacaoRepositoryContract.Params
  ): Promise<ActionResult<ListImportacaoRepositoryContract.Response, any>> {
    try {
      const requestParams: ListImportacaoRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListImportacaoResponse>('/importacoes', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((importacao) => ImportacaoEntity.createFromRaw(importacao)),
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

  async delete(params: DeleteImportacaoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/importacoes/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esta importação');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
