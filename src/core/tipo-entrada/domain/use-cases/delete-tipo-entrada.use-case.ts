import { ActionResult } from "@/core/common/domain/action-result";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export interface DeleteTipoEntradaUseCaseContract {
  execute(params: DeleteTipoEntradaUseCaseContract.Params): Promise<ActionResult<DeleteTipoEntradaUseCaseContract.Response, string>>
}

export namespace DeleteTipoEntradaUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
