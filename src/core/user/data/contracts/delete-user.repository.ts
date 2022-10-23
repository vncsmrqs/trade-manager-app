import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteUserRepositoryContract {
  delete(params: DeleteUserRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteUserRepositoryContract {
  export type Params = {
    id: string;
  };
}
