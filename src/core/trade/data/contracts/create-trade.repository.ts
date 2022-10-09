import { ActionResult } from "@/core/common/domain/action-result";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";

export interface CreateTradeRepositoryContract {
  create(params: CreateTradeRepositoryContract.Params): Promise<ActionResult<void, any>>
}

export namespace CreateTradeRepositoryContract {
  export type Params = CreateTradeUseCaseContract.Params
}
