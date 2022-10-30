import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateUserState, initialCreateUserState } from "@/core/user/presentation/states/create-or-update-user.state";
import { CreateUserUseCaseContract } from "@/core/user/domain/use-cases/create-user.use-case";
import { ListUserController } from "@/core/user/presentation/controllers/list-user.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";

export class CreateOrUpdateUserController extends Controller<CreateOrUpdateUserState> {
  constructor(
    private createUserUseCase: CreateUserUseCaseContract,
    private updateUserUseCase: UpdateUserUseCaseContract,
    private listUserController: ListUserController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateUserState);
  }

  public async createOrUpdateUser(params: any) {
    this.changeState({
      kind: "SavingUserState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateUserUseCase' : 'createUserUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedUserState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Usuário salvo com sucesso!',
          timeout: 3000,
        });
        this.listUserController.loadUserList();
        return;
      }

      this.changeState({
        kind: "ErrorSavingUserState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingUserState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateUserState);
  }
}
