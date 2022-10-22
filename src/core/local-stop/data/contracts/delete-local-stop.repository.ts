import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteLocalStopRepositoryContract {
  delete(params: DeleteLocalStopRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteLocalStopRepositoryContract {
  export type Params = {
    id: string;
  };
}
