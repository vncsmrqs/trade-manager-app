import { ActionResult } from "@/core/common/domain/action-result";

export interface ChangePasswordUseCaseContract {
  execute(
    params: ChangePasswordUseCaseContract.Params
  ): Promise<ActionResult<ChangePasswordUseCaseContract.Response, string>>
}

export namespace ChangePasswordUseCaseContract {
  export type Params = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  export type Response = {}
}
