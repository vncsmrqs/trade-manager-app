import { ActionResult } from "@/core/common/domain/action-result";
import { GetTradeSumUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";

export interface GetTradeSumRepositoryContract {
  getTradeSum(
    params: GetTradeSumRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumRepositoryContract.Response, string>>
}

export namespace GetTradeSumRepositoryContract {
  export type Params = GetTradeSumUseCaseContract.Params;
  export type Response = GetTradeSumUseCaseContract.Response;
}
