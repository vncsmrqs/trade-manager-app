import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface ListTipoEntradaUseCaseContract {
  execute(params: ListTipoEntradaUseCaseContract.Params): Promise<ActionResult<ListTipoEntradaUseCaseContract.Response, string>>
}

export namespace ListTipoEntradaUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: TipoEntradaEntity[];
    page: number;
    pageCount: number;
  }
}
