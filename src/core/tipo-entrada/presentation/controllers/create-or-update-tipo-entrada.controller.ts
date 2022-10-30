import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateTipoEntradaState, initialCreateTipoEntradaState } from "@/core/tipo-entrada/presentation/states/create-or-update-tipo-entrada.state";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";
import { ListTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/list-tipo-entrada.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";

export class CreateOrUpdateTipoEntradaController extends Controller<CreateOrUpdateTipoEntradaState> {
  constructor(
    private createTipoEntradaUseCase: CreateTipoEntradaUseCaseContract,
    private updateTipoEntradaUseCase: UpdateTipoEntradaUseCaseContract,
    private listTipoEntradaController: ListTipoEntradaController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateTipoEntradaState);
  }

  public async createOrUpdateTipoEntrada(params: any) {
    this.changeState({
      kind: "SavingTipoEntradaState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateTipoEntradaUseCase' : 'createTipoEntradaUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedTipoEntradaState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Tipo de entrada salvo com sucesso!',
          timeout: 3000,
        });
        this.listTipoEntradaController.loadTipoEntradaList();
        return;
      }

      this.changeState({
        kind: "ErrorSavingTipoEntradaState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingTipoEntradaState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateTipoEntradaState);
  }
}
