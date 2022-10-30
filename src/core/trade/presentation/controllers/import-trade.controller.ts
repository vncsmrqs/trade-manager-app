import { Controller } from "@/core/common/domain/controller";
import { ImportFileTradeState, initialImportFileTradeState } from "@/core/trade/presentation/states/import-trade.state";
import { UploadFileToImportTradeUseCaseContract } from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";
import { ImportUploadedFileTradeUseCaseContract } from "@/core/trade/domain/use-cases/import-uploaded-file-trade.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class ImportFileTradeController extends Controller<ImportFileTradeState> {
  constructor(
    private uploadFileToImportTradeUseCase: UploadFileToImportTradeUseCaseContract,
    private saveImportedFileTradeUseCase: ImportUploadedFileTradeUseCaseContract,
    private notificationController: NotificationController,
  ) {
    super(initialImportFileTradeState);
  }

  public updateUploadProgress(total: number, loaded: number): void {
    const percentage = Math.round((loaded / total) * 100);
    this.changeState({
      uploadProgress: percentage <= 100 ? percentage : 100,
    });
  }

  public async uploadFile(file: File) {
    if (!this.validateFile(file)) {
      this.notificationController.push({
        type: 'error',
        message: 'Selecione uma planilha válida.',
        timeout: 3000,
      });
      return;
    }

    const {
      name: fileName,
      size: fileSize,
    } = file;

    this.changeState({
      kind: "UploadingImportFileTradeState",
      file,
      fileName,
      fileSize,
    });

    try {
      if (!this.state.file) {
        this.changeState({
          kind: "ErrorImportFileTradeState",
          error: 'Nenhum arquivo foi selecionado!',
        });
        return;
      }

      const result = await this.uploadFileToImportTradeUseCase.execute({
        file: this.state.file,
        fileName: this.state.fileName,
        fileSize: this.state.fileSize,
        uploadProgressCallback: this.updateUploadProgress.bind(this),
      });
      if (result.successful) {
        this.changeState({
          kind: "UploadedImportFiledTradeState",
          filePath: result.value.filePath,
          totalItems: result.value.totalItems,
        });
        return;
      }
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  public async saveFile() {
    if (!(this.state.kind === "UploadedImportFiledTradeState")) {
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: 'Nenhum arquivo foi enviado para o servidor!',
      });
      return;
    }

    this.changeState({
      kind: "SavingImportFileTradeState",
    });

    if (!this.state.filePath) {
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: 'Nenhum arquivo foi enviado para o servidor!',
      });
      return;
    }

    try {
      const result = await this.saveImportedFileTradeUseCase.execute({
        filePath: this.state.filePath,
        filename: this.state.fileName,
      });
      if (result.successful) {
        this.changeState({
          kind: "SavedImportFileTradeState",
        });
        this.notificationController.push({
          type: 'success',
          message: `${this.state.totalItems} registros importados com sucesso!`,
          timeout: 5000,
        });
        return;
      }
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorImportFileTradeState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialImportFileTradeState);
  }

  validateFile(file: File) {
    return this.state.filesTypesAcceptable.includes(file.type);
  }
}
