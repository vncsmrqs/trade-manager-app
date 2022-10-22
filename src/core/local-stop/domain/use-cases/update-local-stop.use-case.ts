import { ActionResult } from "@/core/common/domain/action-result";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export interface UpdateLocalStopUseCaseContract {
  execute(params: UpdateLocalStopUseCaseContract.Params): Promise<ActionResult<UpdateLocalStopUseCaseContract.Response, string>>
}

export namespace UpdateLocalStopUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
