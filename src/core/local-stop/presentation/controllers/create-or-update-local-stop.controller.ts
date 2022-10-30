import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateLocalStopState, initialCreateLocalStopState } from "@/core/local-stop/presentation/states/create-or-update-local-stop.state";
import { CreateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/create-local-stop.use-case";
import { ListLocalStopController } from "@/core/local-stop/presentation/controllers/list-local-stop.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/update-local-stop.use-case";

export class CreateOrUpdateLocalStopController extends Controller<CreateOrUpdateLocalStopState> {
  constructor(
    private createLocalStopUseCase: CreateLocalStopUseCaseContract,
    private updateLocalStopUseCase: UpdateLocalStopUseCaseContract,
    private listLocalStopController: ListLocalStopController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateLocalStopState);
  }

  public async createOrUpdateLocalStop(params: any) {
    this.changeState({
      kind: "SavingLocalStopState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateLocalStopUseCase' : 'createLocalStopUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedLocalStopState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Local do stop salvo com sucesso!',
          timeout: 3000,
        });
        this.listLocalStopController.loadLocalStopList();
        return;
      }

      this.changeState({
        kind: "ErrorSavingLocalStopState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingLocalStopState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateLocalStopState);
  }
}
