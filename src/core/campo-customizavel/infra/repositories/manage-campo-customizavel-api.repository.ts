import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { ActionResult } from "@/core/common/domain/action-result";
import { HttpClient } from "@/core/common/domain/http-client";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";

type ListCampoCustomizavelRequest = {
  search?: string;
  page?: number;
  contexto?: string;
  items_per_page?: number;
  ativo?: boolean;
};

type ListCampoCustomizavelResponse = {
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

export class ManageCampoCustomizavelApiRepository extends HttpClient implements
  ListCampoCustomizavelRepositoryContract
{
  constructor(baseURL: string) {
    super(baseURL);
  }
  async list(
    params: ListCampoCustomizavelRepositoryContract.Params
  ): Promise<ActionResult<ListCampoCustomizavelRepositoryContract.Response, any>> {
    try {
      const requestParams: ListCampoCustomizavelRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        contexto: params.contexto,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListCampoCustomizavelResponse>('/campos-customizaveis', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((campoCustomizavel) => CampoCustomizavelEntity.createFromRaw(campoCustomizavel)),
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
