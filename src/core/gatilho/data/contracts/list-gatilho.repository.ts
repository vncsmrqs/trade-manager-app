import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface ListGatilhoRepositoryContract {
  list(
    params: ListGatilhoRepositoryContract.Params
  ): Promise<ActionResult<ListGatilhoRepositoryContract.Response, string>>
}

export namespace ListGatilhoRepositoryContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: GatilhoEntity[];
    page: number;
    pageCount: number;
  }
}
