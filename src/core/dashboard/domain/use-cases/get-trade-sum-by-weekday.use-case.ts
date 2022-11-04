import { ActionResult } from "@/core/common/domain/action-result";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { WeekdayEnum } from "@/core/dashboard/presentation/state/dashboard.state";

export interface GetTradeSumByWeekdayUseCaseContract {
  execute(
    params: GetTradeSumByWeekdayUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayUseCaseContract.Response, string>>
}

export namespace GetTradeSumByWeekdayUseCaseContract {
  export type Params = {
    startDate: string;
    endDate: string;
    ativoId?: string;
  };
  export type Response = {
    items: TradesByWeekdayItemType[];
  };
}

export type TradesByWeekdayItemType = {
  weekday: WeekdayEnum;
  items: ResultadoTradeValue[];
}

