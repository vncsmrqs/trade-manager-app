import { ActionResult } from "@/core/common/domain/action-result";

export interface CreateTradeUseCaseContract {
  execute(params: CreateTradeUseCaseContract.Params): Promise<ActionResult<CreateTradeUseCaseContract.Response, string>>
}

export namespace CreateTradeUseCaseContract {
  export type Params = {
    name: string,
    active?: boolean,
  };
  export type Response = void;
}
