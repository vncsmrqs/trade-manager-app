import { ActionResult } from "@/core/common/domain/action-result";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export interface CreateTipoStopUseCaseContract {
  execute(params: CreateTipoStopUseCaseContract.Params): Promise<ActionResult<CreateTipoStopUseCaseContract.Response, string>>
}

export namespace CreateTipoStopUseCaseContract {
  export type Params = {
    nome: string;
    ativo: boolean;
  };
  export type Response = void;
}
