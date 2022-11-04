import { ActionResult } from "@/core/common/domain/action-result";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";

export interface GetTradeSumByIntervalUseCaseContract {
  execute(
    params: GetTradeSumByIntervalUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalUseCaseContract.Response, string>>
}

export namespace GetTradeSumByIntervalUseCaseContract {
  export type Params = {
    startDate: string;
    endDate: string;
    ativoId?: string;
  };
  export type Response = {
    items: IntervalTradesItemType[];
  };
}

export type IntervalTradesItemType = {
  interval: string;
  items: ResultadoTradeValue[];
}

