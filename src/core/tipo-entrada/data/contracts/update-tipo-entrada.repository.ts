import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateTipoEntradaRepositoryContract {
  update(params: UpdateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateTipoEntradaRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
