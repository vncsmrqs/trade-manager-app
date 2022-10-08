import { ActionResult } from "@/core/common/domain/action-result";

export interface LoginUseCaseContract {
  execute(
    params: LoginUseCaseContract.Params
  ): Promise<ActionResult<LoginUseCaseContract.Response, string>>
}

export namespace LoginUseCaseContract {
  export type Params = {
    email: string;
    password: string;
  }

  export type Response = {
    token: string;
  }
}
