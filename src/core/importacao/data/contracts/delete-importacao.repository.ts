import { ActionResult } from "@/core/common/domain/action-result";

export interface DeleteImportacaoRepositoryContract {
  delete(params: DeleteImportacaoRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace DeleteImportacaoRepositoryContract {
  export type Params = {
    id: string;
  };
}
