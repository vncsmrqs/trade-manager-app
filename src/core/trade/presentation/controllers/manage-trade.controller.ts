import { Controller } from "@/core/common/domain/controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ManageTradeState, initialManageTradeState } from "@/core/trade/presentation/states/manage-trade.state";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";
import { ActionResult } from "@/core/common/domain/action-result";


export class ManageTradeController extends Controller<ManageTradeState> {
  constructor(
    private uploadTradeImageUseCase: UploadTradeImageUseCaseContract,
    private notificationController: NotificationController
  ) {
    super(initialManageTradeState);
  }

  public async uploadImage(image: File): Promise<ActionResult<string, string>> {
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
        return ActionResult.success(result.value.filePath);
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
        message: `Erro ao inexperado enviar imagem.`,
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
