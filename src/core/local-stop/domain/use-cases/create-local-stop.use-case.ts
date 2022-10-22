import { ActionResult } from "@/core/common/domain/action-result";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export interface CreateLocalStopUseCaseContract {
  execute(params: CreateLocalStopUseCaseContract.Params): Promise<ActionResult<CreateLocalStopUseCaseContract.Response, string>>
}

export namespace CreateLocalStopUseCaseContract {
  export type Params = {
    nome: string;
    ativo: boolean;
  };
  export type Response = void;
}
