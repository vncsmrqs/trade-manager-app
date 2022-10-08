import { ActionResult } from "@/core/common/domain/action-result";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";

export class LoginUseCase implements LoginUseCaseContract {
  execute(
    params: LoginUseCaseContract.Params
  ): Promise<ActionResult<LoginUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ActionResult.success({
          token: 'aaaaaaaaaaaaaaaa'
        }));
      }, 3000);
    });
  }
}
