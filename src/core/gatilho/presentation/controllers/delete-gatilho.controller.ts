import { Controller } from "@/core/common/domain/controller";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoState, initialDeleteGatilhoState } from "@/core/gatilho/presentation/states/delete-gatilho.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListGatilhoController } from "@/core/gatilho/presentation/controllers/list-gatilho.controller";

export class DeleteGatilhoController extends Controller<DeleteGatilhoState> {
  constructor(
    private deleteGatilhoUseCase: DeleteGatilhoUseCaseContract,
    private listGatilhoController: ListGatilhoController,
    private notificationController: NotificationController,
  ) {
    super(initialDeleteGatilhoState);
  }

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
        this.notificationController.push({
          type: 'success',
          message: 'Gatilho excluido com sucesso!',
          timeout: 3000,
        });
        this.listGatilhoController.loadGatilhoList();
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
