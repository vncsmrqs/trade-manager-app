import { ActionResult } from "@/core/common/domain/action-result";

export interface SaveImportedFileTradeUseCaseContract {
  execute(
    params: SaveImportedFileTradeUseCaseContract.Params
  ): Promise<ActionResult<SaveImportedFileTradeUseCaseContract.Response, string>>
}

export namespace SaveImportedFileTradeUseCaseContract {
  export type Params = {
    filePath: string;
  };
  export type Response = void
}
