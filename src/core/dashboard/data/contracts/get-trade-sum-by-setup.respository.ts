import { ActionResult } from "@/core/common/domain/action-result";
import { GetTradeSumBySetupUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";

export interface GetTradeSumBySetupRepositoryContract {
  getTradeSumBySetup(
    params: GetTradeSumBySetupRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupRepositoryContract.Response, string>>
}

export namespace GetTradeSumBySetupRepositoryContract {
  export type Params = GetTradeSumBySetupUseCaseContract.Params;
  export type Response =GetTradeSumBySetupUseCaseContract.Response;
}

