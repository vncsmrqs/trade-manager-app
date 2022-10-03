import { Controller } from "@/core/common/domain/controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { DetailTradeState, initialDetailTradeState } from "@/core/trade/presentation/states/detail-trade.state";

interface DetailTradeUseCaseContract {
  execute(params: any): Promise<any>;
}

export class DetailTradeController extends Controller<DetailTradeState> {
  constructor(
    private detailTradeUseCase: DetailTradeUseCaseContract,
    private notificationController: NotificationController
  ) {
    super(initialDetailTradeState);
  }

  public async detailTrade(id: string) {
    this.changeState({
      kind: "LoadingDetailTradeState",
    });

    try {
      const result = await this.detailTradeUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "LoadedDetailTradeState",
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
        kind: "ErrorDetailTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDetailTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDetailTradeState);
  }
}
