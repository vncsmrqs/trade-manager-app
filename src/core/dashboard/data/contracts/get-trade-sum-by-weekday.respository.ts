import { ActionResult } from "@/core/common/domain/action-result";
import { GetTradeSumByWeekdayUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";

export interface GetTradeSumByWeekdayRepositoryContract {
  getTradeSumByWeekday(
    params: GetTradeSumByWeekdayRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayRepositoryContract.Response, string>>
}

export namespace GetTradeSumByWeekdayRepositoryContract {
  export type Params = GetTradeSumByWeekdayUseCaseContract.Params;
  export type Response = GetTradeSumByWeekdayUseCaseContract.Response;
}
