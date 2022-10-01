import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateSetupUseCaseContract {
  execute(params: UpdateSetupUseCaseContract.Params): Promise<ActionResult<UpdateSetupUseCaseContract.Response, string>>
}

export namespace UpdateSetupUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
