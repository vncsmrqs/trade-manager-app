import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateTradeUseCaseContract {
  execute(params: UpdateTradeUseCaseContract.Params): Promise<ActionResult<UpdateTradeUseCaseContract.Response, string>>
}

export namespace UpdateTradeUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
