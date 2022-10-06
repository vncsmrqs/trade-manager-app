import { ActionResult } from "@/core/common/domain/action-result";
import { ImportUploadedFileTradeUseCaseContract } from "@/core/trade/domain/use-cases/import-uploaded-file-trade.use-case";

export interface ImportUploadedFileTradeRepositoryContract {
  importFile(
    params: ImportUploadedFileTradeRepositoryContract.Params
  ): Promise<ActionResult<ImportUploadedFileTradeRepositoryContract.Response, string>>
}

export namespace ImportUploadedFileTradeRepositoryContract {
  export type Params = ImportUploadedFileTradeUseCaseContract.Params
  export type Response = ImportUploadedFileTradeUseCaseContract.Response
}
