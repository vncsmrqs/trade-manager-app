import { ActionResult } from "@/core/common/domain/action-result";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export interface DeleteTipoStopUseCaseContract {
  execute(params: DeleteTipoStopUseCaseContract.Params): Promise<ActionResult<DeleteTipoStopUseCaseContract.Response, string>>
}

export namespace DeleteTipoStopUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
