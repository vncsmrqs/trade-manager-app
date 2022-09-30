import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteTipoEntradaRepositoryContract {
  delete(params: DeleteTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteTipoEntradaRepositoryContract {
  export type Params = {
    id: string;
  };
}
