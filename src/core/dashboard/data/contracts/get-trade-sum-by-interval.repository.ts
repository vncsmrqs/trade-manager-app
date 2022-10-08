import { ActionResult } from "@/core/common/domain/action-result";
import { GetTradeSumByIntervalUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";

export interface GetTradeSumByIntervalRepositoryContract {
  getTradeSumByInterval(
    params: GetTradeSumByIntervalRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalRepositoryContract.Response, string>>
}

export namespace GetTradeSumByIntervalRepositoryContract {
  export type Params = GetTradeSumByIntervalUseCaseContract.Params;
  export type Response = GetTradeSumByIntervalUseCaseContract.Response;
}
