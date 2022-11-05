import { ActionResult } from "@/core/common/domain/action-result";
import { ChangePasswordUseCaseContract } from "@/core/auth/domain/use-cases/change-password.use-case";
import { ChangePasswordRepositoryContract } from "@/core/auth/data/contracts/change-password.repository";

export class ChangePasswordUseCase implements ChangePasswordUseCaseContract {
  constructor(
    private changePasswordRepository: ChangePasswordRepositoryContract
  ) {}
  async execute(
    params: ChangePasswordUseCaseContract.Params
  ): Promise<ActionResult<ChangePasswordUseCaseContract.Response, string>> {
    if (!params.currentPassword || !params.currentPassword.length) {
      return ActionResult.failure('Você precisa informar a senha atual');
    }
    if (!params.newPassword || !params.newPassword.length) {
      return ActionResult.failure('Você precisa informa uma nova senha.');
    }
    if (params.newPassword !== params.confirmNewPassword) {
      return ActionResult.failure('As novas senhas informadas não conferem.');
    }
    return this.changePasswordRepository.changePassword(params);
  }
}
