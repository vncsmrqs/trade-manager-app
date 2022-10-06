import { ActionResult } from "@/core/common/domain/action-result";
import { UploadFileToImportTradeUseCaseContract } from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";
import { UploadFileToImportTradeRepositoryContract } from "@/core/trade/data/contracts/upload-file-to-import-trade.repository";

export class UploadFileToImportTradeUseCase implements UploadFileToImportTradeUseCaseContract {
  constructor(
    private uploadFileToImportRepository: UploadFileToImportTradeRepositoryContract
  ) {}

  async execute(
    params: UploadFileToImportTradeUseCaseContract.Params
  ): Promise<ActionResult<UploadFileToImportTradeUseCaseContract.Response, any>> {
    return this.uploadFileToImportRepository.uploadFile(params);
  }
}
