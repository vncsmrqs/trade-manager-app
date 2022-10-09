import { ActionResult } from "@/core/common/domain/action-result";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";

export interface UpdateTradeRepositoryContract {
  update(params: UpdateTradeRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateTradeRepositoryContract {
  export type Params = UpdateTradeUseCaseContract.Params;
}
