import { ActionResult } from "@/core/common/domain/action-result";

export interface UploadFileToImportTradeUseCaseContract {
  execute(
    params: UploadFileToImportTradeUseCaseContract.Params
  ): Promise<ActionResult<UploadFileToImportTradeUseCaseContract.Response, string>>
}

export namespace UploadFileToImportTradeUseCaseContract {
  export type Params = {
    file: File;
    fileName: string;
    fileSize: number;
    uploadProgressCallback: UploadProgressCallback;
  };
  export type Response = {
    totalItems: number;
    filePath: string;
  };

  export type UploadProgressCallback = (total: number, loaded: number) => void
}
