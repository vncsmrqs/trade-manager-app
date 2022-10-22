import { ActionResult } from "@/core/common/domain/action-result";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";

export interface ListAtivoUseCaseContract {
  execute(params: ListAtivoUseCaseContract.Params): Promise<ActionResult<ListAtivoUseCaseContract.Response, string>>
}

export namespace ListAtivoUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: AtivoEntity[];
    page: number;
    pageCount: number;
  }
}
