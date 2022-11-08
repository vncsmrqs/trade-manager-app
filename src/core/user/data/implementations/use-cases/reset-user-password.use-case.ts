import { ActionResult } from "@/core/common/domain/action-result";import { ResetUserPasswordUseCaseContract } from "@/core/user/domain/use-cases/reset-user-password.use-case";
import { ResetUserPasswordRepositoryContract } from "@/core/user/data/contracts/reset-user-password.repository";

export class ResetUserPasswordUseCase implements ResetUserPasswordUseCaseContract {
  constructor(
    private resetUserPasswordRepository: ResetUserPasswordRepositoryContract
  ) {}

  async execute(
    params: ResetUserPasswordUseCaseContract.Params
  ): Promise<ActionResult<ResetUserPasswordUseCaseContract.Response, any>> {
    return this.resetUserPasswordRepository.resetUserPassword(params);
  }
}
