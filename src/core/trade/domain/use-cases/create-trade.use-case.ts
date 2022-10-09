import { ActionResult } from "@/core/common/domain/action-result";
import { DefaultTradeEntityProps } from "@/core/trade/domain/entities/trade.entity";

export interface CreateTradeUseCaseContract {
  execute(params: CreateTradeUseCaseContract.Params): Promise<ActionResult<CreateTradeUseCaseContract.Response, string>>
}

export namespace CreateTradeUseCaseContract {
  export type Params = Omit<DefaultTradeEntityProps, 'id'>;
  export type Response = void;
}
