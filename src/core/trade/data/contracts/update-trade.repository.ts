import { ActionResult } from "@/core/common/domain/action-result";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export interface UpdateTradeRepositoryContract {
  update(params: UpdateTradeRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateTradeRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
