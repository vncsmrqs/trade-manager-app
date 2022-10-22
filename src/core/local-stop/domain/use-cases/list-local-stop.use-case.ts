import { ActionResult } from "@/core/common/domain/action-result";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export interface ListLocalStopUseCaseContract {
  execute(params: ListLocalStopUseCaseContract.Params): Promise<ActionResult<ListLocalStopUseCaseContract.Response, string>>
}

export namespace ListLocalStopUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: LocalStopEntity[];
    page: number;
    pageCount: number;
  }
}
