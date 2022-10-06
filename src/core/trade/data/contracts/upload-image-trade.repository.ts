import { ActionResult } from "@/core/common/domain/action-result";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";

export interface UploadTradeImageRepositoryContract {
  uploadImage(
    params: UploadTradeImageRepositoryContract.Params
  ): Promise<ActionResult<UploadTradeImageRepositoryContract.Response, string>>
}

export namespace UploadTradeImageRepositoryContract {
  export type Params = UploadTradeImageUseCaseContract.Params
  export type Response = UploadTradeImageUseCaseContract.Response
}
