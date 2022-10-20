import { ActionResult } from "@/core/common/domain/action-result";

export interface ImportUploadedFileTradeUseCaseContract {
  execute(
    params: ImportUploadedFileTradeUseCaseContract.Params
  ): Promise<ActionResult<ImportUploadedFileTradeUseCaseContract.Response, string>>
}

export namespace ImportUploadedFileTradeUseCaseContract {
  export type Params = {
    filePath: string;
    filename: string;
  };
  export type Response = void
}
