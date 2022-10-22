import { Controller } from "@/core/common/domain/controller";
import { DeleteLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/delete-local-stop.use-case";
import { DeleteLocalStopState, initialDeleteLocalStopState } from "@/core/local-stop/presentation/states/delete-local-stop.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListLocalStopController } from "@/core/local-stop/presentation/controllers/list-local-stop.controller";

export class DeleteLocalStopController extends Controller<DeleteLocalStopState> {
  constructor(
    private deleteLocalStopUseCase: DeleteLocalStopUseCaseContract,
    private listLocalStopController: ListLocalStopController,
    private notifierController: NotificationController,
  ) {
    super(initialDeleteLocalStopState);
  }


  public async deleteLocalStop(id: string) {
    this.changeState({
      kind: "DeletingLocalStopState",
    });

    try {
      const result = await this.deleteLocalStopUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedLocalStopState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'LocalStop excluido com sucesso!',
          timeout: 3000,
        });
        this.listLocalStopController.loadLocalStopList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteLocalStopState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteLocalStopState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteLocalStopState);
  }
}
