import { Controller } from "@/core/common/domain/controller";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/delete-setup.use-case";
import { DeleteSetupState, initialDeleteSetupState } from "@/core/setup/presentation/states/delete-setup.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";

export class DeleteSetupController extends Controller<DeleteSetupState> {
  constructor(
    private deleteSetupUseCase: DeleteSetupUseCaseContract,
    private setupViewController: SetupViewController,
  ) {
    super(initialDeleteSetupState);
  }

  private notifierController = app.make<NotificationController>(TYPES.NotificationController);

  public async deleteSetup(id: string) {
    this.changeState({
      kind: "DeletingSetupState",
    });

    try {
      const result = await this.deleteSetupUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedSetupState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'Setup excluido com sucesso!',
          timeout: 3000,
        });
        this.setupViewController.loadSetupList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteSetupState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteSetupState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteSetupState);
  }
}
