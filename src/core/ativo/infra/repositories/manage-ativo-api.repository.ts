import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { HttpClient } from "@/core/common/domain/http-client";

type ListAtivoRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
};

type ListAtivoResponse = {
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

export class ManageAtivoApiRepository extends HttpClient implements
  ListAtivoRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListAtivoRepositoryContract.Params
  ): Promise<ActionResult<ListAtivoRepositoryContract.Response, any>> {
    try {
      const requestParams: ListAtivoRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
      };

      const { data, meta } = await this.client.get<ListAtivoResponse>('/ativos', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((ativo) => AtivoEntity.createFromRaw(ativo)),
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
}
