import { ActionResult } from "@/core/common/domain/action-result";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export interface CreateTradeRepositoryContract {
  create(params: CreateTradeRepositoryContract.Params): Promise<ActionResult<void, any>>
}

export namespace CreateTradeRepositoryContract {
  export type Params = {
    name: string;
    description?: string;
  };
}
