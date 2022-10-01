import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteSetupUseCaseContract {
  execute(params: DeleteSetupUseCaseContract.Params): Promise<ActionResult<DeleteSetupUseCaseContract.Response, string>>
}

export namespace DeleteSetupUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
