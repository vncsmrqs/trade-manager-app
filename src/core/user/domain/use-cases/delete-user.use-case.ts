import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteUserUseCaseContract {
  execute(params: DeleteUserUseCaseContract.Params): Promise<ActionResult<DeleteUserUseCaseContract.Response, string>>
}

export namespace DeleteUserUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
