import { Controller } from "@/core/common/domain/controller";
import { DeleteTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/delete-tipo-stop.use-case";
import { DeleteTipoStopState, initialDeleteTipoStopState } from "@/core/tipo-stop/presentation/states/delete-tipo-stop.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListTipoStopController } from "@/core/tipo-stop/presentation/controllers/list-tipo-stop.controller";

export class DeleteTipoStopController extends Controller<DeleteTipoStopState> {
  constructor(
    private deleteTipoStopUseCase: DeleteTipoStopUseCaseContract,
    private listTipoStopController: ListTipoStopController,
    private notifierController: NotificationController,
  ) {
    super(initialDeleteTipoStopState);
  }


  public async deleteTipoStop(id: string) {
    this.changeState({
      kind: "DeletingTipoStopState",
    });

    try {
      const result = await this.deleteTipoStopUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedTipoStopState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'TipoStop excluido com sucesso!',
          timeout: 3000,
        });
        this.listTipoStopController.loadTipoStopList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteTipoStopState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteTipoStopState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteTipoStopState);
  }
}
