import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface CreateTipoEntradaRepositoryContract {
  create(params: CreateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, any>>
}

export namespace CreateTipoEntradaRepositoryContract {
  export type Params = {
    name: string;
    description?: string;
  };
}
