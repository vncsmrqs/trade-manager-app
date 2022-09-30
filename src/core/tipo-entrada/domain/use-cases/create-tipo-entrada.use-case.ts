import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface CreateTipoEntradaUseCaseContract {
  execute(params: CreateTipoEntradaUseCaseContract.Params): Promise<ActionResult<CreateTipoEntradaUseCaseContract.Response, string>>
}

export namespace CreateTipoEntradaUseCaseContract {
  export type Params = {
    name: string,
    active?: boolean,
  };
  export type Response = void;
}
