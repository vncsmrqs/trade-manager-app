import { Controller } from "@/core/common/domain/controller";
import { DeleteUserUseCaseContract } from "@/core/user/domain/use-cases/delete-user.use-case";
import { DeleteUserState, initialDeleteUserState } from "@/core/user/presentation/states/delete-user.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListUserController } from "@/core/user/presentation/controllers/list-user.controller";

export class DeleteUserController extends Controller<DeleteUserState> {
  constructor(
    private deleteUserUseCase: DeleteUserUseCaseContract,
    private listUserController: ListUserController,
    private notificationController: NotificationController,
  ) {
    super(initialDeleteUserState);
  }

  public async deleteUser(id: string) {
    this.changeState({
      kind: "DeletingUserState",
    });

    try {
      const result = await this.deleteUserUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedUserState",
        });
        this.notificationController.push({
          type: 'success',
          message: 'Usuário excluido com sucesso!',
          timeout: 3000,
        });
        this.listUserController.loadUserList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteUserState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteUserState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteUserState);
  }
}
