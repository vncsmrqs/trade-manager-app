import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateSetupState, initialCreateSetupState } from "@/core/setup/presentation/states/create-or-update-setup.state";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class CreateOrUpdateSetupController extends Controller<CreateOrUpdateSetupState> {
  constructor(
    private createSetupUseCase: CreateSetupUseCaseContract,
    private setupViewController: SetupViewController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateSetupState);
  }

  public async createOrUpdateSetup(params: any) {
    this.changeState({
      kind: "SavingSetupState",
      formDisabled: true,
    });

    try {
      const result = await this.createSetupUseCase.execute(params);
      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedSetupState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Setup salvo com sucesso!',
          timeout: 3000,
        });
        this.setupViewController.loadSetupList();
        return;
      }
      this.changeState({
        kind: "ErrorSavingSetupState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingSetupState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateSetupState);
  }
}