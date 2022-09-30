import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteGatilhoRepositoryContract {
  delete(params: DeleteGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteGatilhoRepositoryContract {
  export type Params = {
    id: string;
  };
}
