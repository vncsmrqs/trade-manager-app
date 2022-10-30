import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateTipoStopState, initialCreateTipoStopState } from "@/core/tipo-stop/presentation/states/create-or-update-tipo-stop.state";
import { CreateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/create-tipo-stop.use-case";
import { ListTipoStopController } from "@/core/tipo-stop/presentation/controllers/list-tipo-stop.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/update-tipo-stop.use-case";

export class CreateOrUpdateTipoStopController extends Controller<CreateOrUpdateTipoStopState> {
  constructor(
    private createTipoStopUseCase: CreateTipoStopUseCaseContract,
    private updateTipoStopUseCase: UpdateTipoStopUseCaseContract,
    private listTipoStopController: ListTipoStopController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateTipoStopState);
  }

  public async createOrUpdateTipoStop(params: any) {
    this.changeState({
      kind: "SavingTipoStopState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateTipoStopUseCase' : 'createTipoStopUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedTipoStopState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Tipo de stop salvo com sucesso!',
          timeout: 3000,
        });
        this.listTipoStopController.loadTipoStopList();
        return;
      }

      this.changeState({
        kind: "ErrorSavingTipoStopState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingTipoStopState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateTipoStopState);
  }
}
