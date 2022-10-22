import { ActionResult } from "@/core/common/domain/action-result";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export interface ListTipoStopUseCaseContract {
  execute(params: ListTipoStopUseCaseContract.Params): Promise<ActionResult<ListTipoStopUseCaseContract.Response, string>>
}

export namespace ListTipoStopUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: TipoStopEntity[];
    page: number;
    pageCount: number;
  }
}
