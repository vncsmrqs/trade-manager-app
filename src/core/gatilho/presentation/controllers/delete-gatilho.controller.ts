import { Controller } from "@/core/common/domain/controller";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoState, initialDeleteGatilhoState } from "@/core/gatilho/presentation/states/delete-gatilho.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { GatilhoViewController } from "@/core/gatilho/presentation/controllers/gatilho-view.controller";

export class DeleteGatilhoController extends Controller<DeleteGatilhoState> {
  constructor(
    private deleteGatilhoUseCase: DeleteGatilhoUseCaseContract,
    private gatilhoViewController: GatilhoViewController,
  ) {
    super(initialDeleteGatilhoState);
  }

  private notifierController = app.make<NotificationController>(TYPES.NotificationController);

  public async deleteGatilho(id: string) {
    this.changeState({
      kind: "DeletingGatilhoState",
    });

    try {
      const result = await this.deleteGatilhoUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedGatilhoState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'Gatilho excluido com sucesso!',
          timeout: 3000,
        });
        this.gatilhoViewController.loadGatilhoList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteGatilhoState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteGatilhoState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteGatilhoState);
  }
}
