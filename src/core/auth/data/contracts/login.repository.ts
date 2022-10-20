import { ActionResult } from "@/core/common/domain/action-result";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";

export interface LoginRepositoryContract {
  login(params: LoginRepositoryContract.Params): Promise<ActionResult<LoginRepositoryContract.Response, string>>;
}

export namespace LoginRepositoryContract {
  export type Params = LoginUseCaseContract.Params;
  export type Response = LoginUseCaseContract.Response;
}
