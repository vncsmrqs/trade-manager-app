import { ActionResult } from "@/core/common/domain/action-result";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";

export interface ListAtivoRepositoryContract {
  list(
    params: ListAtivoRepositoryContract.Params
  ): Promise<ActionResult<ListAtivoRepositoryContract.Response, string>>
}

export namespace ListAtivoRepositoryContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: AtivoEntity[];
    page: number;
    pageCount: number;
  }
}
