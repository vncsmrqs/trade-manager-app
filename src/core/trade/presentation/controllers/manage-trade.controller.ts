import { Controller } from "@/core/common/domain/controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ManageTradeState, initialManageTradeState } from "@/core/trade/presentation/states/manage-trade.state";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";


export class ManageTradeController extends Controller<ManageTradeState> {
  constructor(
    private uploadTradeImageUseCase: UploadTradeImageUseCaseContract,
    private notificationController: NotificationController,
    private createTradeUseCase: CreateTradeUseCaseContract,
    private updateTradeUseCase: UpdateTradeUseCaseContract,
  ) {
    super(initialManageTradeState);
  }

  public async createOrUpdateTrade(trade: TradeEntity): Promise<void> {
    this.changeState({
      kind: "LoadingManageTradeState",
    });
    try {
      const result = await this[
        trade.id ? 'updateTradeUseCase' : 'createTradeUseCase'
      ].execute(trade.toObject);

      if (result.successful) {
        this.changeState({
          kind: "LoadedManageTradeState",
        });
        this.notificationController.push({
          type: 'success',
          message: 'Registro salvo com sucesso!',
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
        error: "Algo inesperado aconteceu ao salvar o registro.",
      });
    }
  }

  public async uploadImage(image: File): Promise<ActionResult<UploadTradeImageUseCaseContract.Response, string>> {
    this.changeState({
      isUploadingImage: true,
      uploadImageError: undefined,
      uploadImagePercentage: 0,
    });

    try {
      const result = await this.uploadTradeImageUseCase.execute({
        image,
        fileName: image.name,
        fileSize: image.size,
        uploadProgressCallback: this.updateUploadImagePercentage.bind(this),
      });
      if (result.successful) {
        this.changeState({
          isUploadingImage: false,
          uploadImagePercentage: 0,
          uploadImageError: undefined,
        });
        return result;
      }
      this.notificationController.push({
        type: 'error',
        message: `Erro ao enviar imagem: ${result.error}`,
        timeout: 5000,
      });
      this.changeState({
        isUploadingImage: false,
        uploadImagePercentage: 0,
        uploadImageError: result.error,
      });
      return ActionResult.failure(result.error);
    } catch (error: any) {
      this.changeState({
        isUploadingImage: false,
        uploadImagePercentage: 0,
        uploadImageError: error.message,
      });
      this.notificationController.push({
        type: 'error',
        message: `Erro ao inesperado enviar imagem.`,
        timeout: 5000,
      });
      return ActionResult.failure(error.message);
    }
  }

  updateUploadImagePercentage(total: number, loaded: number): void {
    const percentage = Math.round((loaded / total) * 100);
    this.changeState({
      uploadImagePercentage: percentage <= 100 ? percentage : 100,
    });
  }

  resetState() {
    this.changeState(initialManageTradeState);
  }
}
