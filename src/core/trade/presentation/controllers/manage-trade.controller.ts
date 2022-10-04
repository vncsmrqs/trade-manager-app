import { Controller } from "@/core/common/domain/controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ManageTradeState, initialManageTradeState } from "@/core/trade/presentation/states/manage-trade.state";

interface DetailTradeUseCaseContract {
  execute(params: any): Promise<any>;
}

export class ManageTradeController extends Controller<ManageTradeState> {
  constructor(
    private detailTradeUseCase: DetailTradeUseCaseContract,
    private notificationController: NotificationController
  ) {
    super(initialManageTradeState);
  }

  public async detailTrade(id: string) {
    this.changeState({
      kind: "LoadingManageTradeState",
    });

    try {
      const result = await this.detailTradeUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "LoadedManageTradeState",
          item: result.value,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Dados carregados com sucesso!',
          timeout: 3000,
        });
        return;
      }
      this.changeState({
        kind: "ErrorManageTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorManageTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialManageTradeState);
  }
}
