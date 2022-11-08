import { Controller } from "@/core/common/domain/controller";
import { ResetUserPasswordState, initialResetUserPasswordState } from "@/core/user/presentation/states/reset-user-password.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ResetUserPasswordUseCaseContract } from "@/core/user/domain/use-cases/reset-user-password.use-case";

export class ResetUserPasswordController extends Controller<ResetUserPasswordState> {
  constructor(
    private resetUserPasswordUseCase: ResetUserPasswordUseCaseContract,
    private notificationController: NotificationController,
  ) {
    super(initialResetUserPasswordState);
  }

  public async resetUserPassword(id: string) {
    this.changeState({
      kind: "ResettingUserPasswordState",
    });

    try {
      const result = await this.resetUserPasswordUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "RedefinedUserPasswordState",
        });
        this.notificationController.push({
          type: 'success',
          message: 'Senha do usuário redefinida com sucesso!',
          timeout: 3000,
        });
        return;
      }
      this.changeState({
        kind: "ErrorResetUserPasswordState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorResetUserPasswordState",
        error: 'Algum erro inesperado aconteceu ao tentar redefinir a senha do usuário!',
      });
    }
  }

  resetState() {
    this.changeState(initialResetUserPasswordState);
  }
}
