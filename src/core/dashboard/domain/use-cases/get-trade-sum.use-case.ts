import { ActionResult } from "@/core/common/domain/action-result";
import { TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";

export interface GetTradeSumUseCaseContract {
  execute(
    params: GetTradeSumUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumUseCaseContract.Response, string>>
}

export namespace GetTradeSumUseCaseContract {
  export type Params = {
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    ativoId?: string;
  };
  export type Response = {
    items: ResultadoTradeValue[];
  };
}

export type ResultadoTradeValue = {
  name: TradeResultadoType,
  value: number,
}
