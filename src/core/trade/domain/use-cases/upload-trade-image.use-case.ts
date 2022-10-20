import { ActionResult } from "@/core/common/domain/action-result";

export interface UploadTradeImageUseCaseContract {
  execute(
    params: UploadTradeImageUseCaseContract.Params
  ): Promise<ActionResult<UploadTradeImageUseCaseContract.Response, string>>
}

export namespace UploadTradeImageUseCaseContract {
  export type Params = {
    image: File;
    fileName: string;
    fileSize: number;
    uploadProgressCallback?: UploadProgressCallback;
  };
  export type Response = {
    filePath: string;
    imageUrl: string;
  };

  export type UploadProgressCallback = (total: number, loaded: number) => void
}
