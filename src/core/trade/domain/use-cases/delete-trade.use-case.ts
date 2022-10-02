import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteTradeUseCaseContract {
  execute(params: DeleteTradeUseCaseContract.Params): Promise<ActionResult<DeleteTradeUseCaseContract.Response, string>>
}

export namespace DeleteTradeUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
