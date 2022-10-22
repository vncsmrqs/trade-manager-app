import { ActionResult } from "@/core/common/domain/action-result";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export interface UpdateTipoStopUseCaseContract {
  execute(params: UpdateTipoStopUseCaseContract.Params): Promise<ActionResult<UpdateTipoStopUseCaseContract.Response, string>>
}

export namespace UpdateTipoStopUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
