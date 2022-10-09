import { ActionResult } from "@/core/common/domain/action-result";
import { DefaultTradeEntityProps } from "@/core/trade/domain/entities/trade.entity";

export interface UpdateTradeUseCaseContract {
  execute(params: UpdateTradeUseCaseContract.Params): Promise<ActionResult<UpdateTradeUseCaseContract.Response, string>>
}

export namespace UpdateTradeUseCaseContract {
  export type Params = DefaultTradeEntityProps;
  export type Response = void;
}
