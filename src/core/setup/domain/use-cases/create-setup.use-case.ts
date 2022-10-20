import { ActionResult } from "@/core/common/domain/action-result";

export interface CreateSetupUseCaseContract {
  execute(params: CreateSetupUseCaseContract.Params): Promise<ActionResult<CreateSetupUseCaseContract.Response, string>>
}

export namespace CreateSetupUseCaseContract {
  export type Params = {
    nome: string;
    ativo: boolean;
  };
  export type Response = void;
}
