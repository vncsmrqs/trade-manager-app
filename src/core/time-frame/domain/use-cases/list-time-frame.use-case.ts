import { ActionResult } from "@/core/common/domain/action-result";
import { TimeFrameEntity } from "@/core/time-frame/domain/entities/time-frame.entity";

export interface ListTimeFrameUseCaseContract {
  execute(params: ListTimeFrameUseCaseContract.Params): Promise<ActionResult<ListTimeFrameUseCaseContract.Response, string>>
}

export namespace ListTimeFrameUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: TimeFrameEntity[];
    page: number;
    pageCount: number;
  }
}
