import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateTipoStopRepositoryContract {
  update(params: UpdateTipoStopRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateTipoStopRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
