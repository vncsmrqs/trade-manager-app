import { Controller } from "@/core/common/domain/controller";
import { CreateOrUpdateTradeState, initialCreateTradeState } from "@/core/trade/presentation/states/create-or-update-trade.state";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { ListTradeController } from "./list-trade.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";

export class CreateOrUpdateTradeController extends Controller<CreateOrUpdateTradeState> {
  constructor(
    private createTradeUseCase: CreateTradeUseCaseContract,
    private updateTradeUseCase: UpdateTradeUseCaseContract,
    private listTradeController: ListTradeController,
    private notificationController: NotificationController,

  ) {
    super(initialCreateTradeState);
  }

  public async createOrUpdateTrade(params: any) {
    this.changeState({
      kind: "SavingTradeState",
      formDisabled: true,
    });

    try {

      const result = await this[
        params.id ? 'updateTradeUseCase' : 'createTradeUseCase'
      ].execute(params);

      if (result.successful) {
        this.changeState({
          kind: "CreatedOrUpdatedTradeState",
          formDisabled: false,
        });
        this.notificationController.push({
          type: 'success',
          message: 'Trade salvo com sucesso!',
          timeout: 3000,
        });
        return;
      }

      this.changeState({
        kind: "ErrorSavingTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorSavingTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateTradeState);
  }
}
