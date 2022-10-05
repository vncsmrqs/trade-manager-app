import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface ListTipoEntradaRepositoryContract {
  list(
    params: ListTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<ListTipoEntradaRepositoryContract.Response, string>>
}

export namespace ListTipoEntradaRepositoryContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: TipoEntradaEntity[];
    page: number;
    pageCount: number;
  }
}
