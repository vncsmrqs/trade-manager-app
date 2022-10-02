import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteTradeRepositoryContract {
  delete(params: DeleteTradeRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteTradeRepositoryContract {
  export type Params = {
    id: string;
  };
}
