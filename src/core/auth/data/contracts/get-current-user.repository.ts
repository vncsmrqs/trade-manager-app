import { ActionResult } from "@/core/common/domain/action-result";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";

export interface GetCurrentUserRepositoryContract {
  getCurrentUser(
    params?: GetCurrentUserRepositoryContract.Params
  ): Promise<ActionResult<GetCurrentUserRepositoryContract.Response, string>>;
}

export namespace GetCurrentUserRepositoryContract {
  export type Params = GetCurrentUserUseCaseContract.Params;
  export type Response = GetCurrentUserUseCaseContract.Response;
}
