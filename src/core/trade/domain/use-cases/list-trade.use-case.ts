import { ActionResult } from "@/core/common/domain/action-result";
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";

export interface ListTradeUseCaseContract {
  execute(params: ListTradeUseCaseContract.Params): Promise<ActionResult<ListTradeUseCaseContract.Response, string>>
}

export namespace ListTradeUseCaseContract {
  export type Params = ListTradeRepositoryContract.Params;
  export type Response = ListTradeRepositoryContract.Response;
}
