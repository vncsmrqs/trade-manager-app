import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface UpdateTipoEntradaUseCaseContract {
  execute(params: UpdateTipoEntradaUseCaseContract.Params): Promise<ActionResult<UpdateTipoEntradaUseCaseContract.Response, string>>
}

export namespace UpdateTipoEntradaUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
