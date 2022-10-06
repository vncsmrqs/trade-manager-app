import { ActionResult } from "@/core/common/domain/action-result";
import { UploadFileToImportTradeUseCaseContract } from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";

export interface UploadFileToImportTradeRepositoryContract {
  uploadFile(
    params: UploadFileToImportTradeRepositoryContract.Params
  ): Promise<ActionResult<UploadFileToImportTradeRepositoryContract.Response, string>>
}

export namespace UploadFileToImportTradeRepositoryContract {
  export type Params = UploadFileToImportTradeUseCaseContract.Params
  export type Response = UploadFileToImportTradeUseCaseContract.Response
}
