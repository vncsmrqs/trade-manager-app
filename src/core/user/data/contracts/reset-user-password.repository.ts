import { ActionResult } from "@/core/common/domain/action-result";
import { ResetUserPasswordUseCaseContract } from "@/core/user/domain/use-cases/reset-user-password.use-case";

export interface ResetUserPasswordRepositoryContract {
  resetUserPassword(params: ResetUserPasswordRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace ResetUserPasswordRepositoryContract {
  export type Params = ResetUserPasswordUseCaseContract.Params;
}
