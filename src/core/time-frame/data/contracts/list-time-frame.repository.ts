import { ActionResult } from "@/core/common/domain/action-result";
import { TimeFrameEntity } from "@/core/time-frame/domain/entities/time-frame.entity";

export interface ListTimeFrameRepositoryContract {
  list(
    params: ListTimeFrameRepositoryContract.Params
  ): Promise<ActionResult<ListTimeFrameRepositoryContract.Response, string>>
}

export namespace ListTimeFrameRepositoryContract {
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
