import { ActionResult } from "@/core/common/domain/action-result";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";
import { LoginRepositoryContract } from "@/core/auth/data/contracts/login.repository";

export class LoginUseCase implements LoginUseCaseContract {
  constructor(
    private loginRepository: LoginRepositoryContract
  ) {}
  execute(
    params: LoginUseCaseContract.Params
  ): Promise<ActionResult<LoginUseCaseContract.Response, string>> {
    return this.loginRepository.login(params);
  }
}
