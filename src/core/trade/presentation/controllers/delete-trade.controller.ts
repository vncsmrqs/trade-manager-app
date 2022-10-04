import { Controller } from "@/core/common/domain/controller";
import { DeleteTradeUseCaseContract } from "@/core/trade/domain/use-cases/delete-trade.use-case";
import { DeleteTradeState, initialDeleteTradeState } from "@/core/trade/presentation/states/delete-trade.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class DeleteTradeController extends Controller<DeleteTradeState> {
  constructor(
    private deleteTradeUseCase: DeleteTradeUseCaseContract,
    private notifierController: NotificationController
  ) {
    super(initialDeleteTradeState);
  }

  public async deleteTrade(id: string) {
    this.changeState({
      kind: "DeletingTradeState",
    });

    try {
      const result = await this.deleteTradeUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedTradeState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'Trade excluido com sucesso!',
          timeout: 3000,
        });
        return;
      }
      this.changeState({
        kind: "ErrorDeleteTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteTradeState);
  }
}
