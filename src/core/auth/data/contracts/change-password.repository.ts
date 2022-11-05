import { ActionResult } from "@/core/common/domain/action-result";
import { ChangePasswordUseCaseContract } from "@/core/auth/domain/use-cases/change-password.use-case";

export interface ChangePasswordRepositoryContract {
  changePassword(
    params: ChangePasswordRepositoryContract.Params
  ): Promise<ActionResult<ChangePasswordRepositoryContract.Response, string>>;
}

export namespace ChangePasswordRepositoryContract {
  export type Params = ChangePasswordUseCaseContract.Params;
  export type Response = ChangePasswordUseCaseContract.Response;
}
