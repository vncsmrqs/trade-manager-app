import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteSetupRepositoryContract {
  delete(params: DeleteSetupRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteSetupRepositoryContract {
  export type Params = {
    id: string;
  };
}
