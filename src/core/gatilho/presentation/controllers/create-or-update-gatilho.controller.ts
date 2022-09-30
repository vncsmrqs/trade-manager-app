import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateGatilhoState, initialCreateGatilhoState } from "@/core/gatilho/presentation/states/create-or-update-gatilho.state";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";
import { ListGatilhoController } from "@/core/gatilho/presentation/controllers/list-gatilho.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";

export class CreateOrUpdateGatilhoController extends Controller<CreateOrUpdateGatilhoState> {
  constructor(
    private createGatilhoUseCase: CreateGatilhoUseCaseContract,
    private updateGatilhoUseCase: UpdateGatilhoUseCaseContract,
    private listGatilhoController: ListGatilhoController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateGatilhoState);
  }

  public async createOrUpdateGatilho(params: any) {
    this.changeState({
      kind: "SavingGatilhoState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateGatilhoUseCase' : 'createGatilhoUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedGatilhoState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Gatilho salvo com sucesso!',
          timeout: 3000,
        });
        this.listGatilhoController.loadGatilhoList();
        return;
      }

      this.changeState({
        kind: "ErrorSavingGatilhoState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingGatilhoState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateGatilhoState);
  }
}
