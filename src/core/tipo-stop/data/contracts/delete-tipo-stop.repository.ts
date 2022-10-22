import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteTipoStopRepositoryContract {
  delete(params: DeleteTipoStopRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteTipoStopRepositoryContract {
  export type Params = {
    id: string;
  };
}
