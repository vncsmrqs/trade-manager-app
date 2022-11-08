import { ActionResult } from "@/core/common/domain/action-result";

export interface ResetUserPasswordUseCaseContract {
  execute(
    params: ResetUserPasswordUseCaseContract.Params
  ): Promise<ActionResult<ResetUserPasswordUseCaseContract.Response, string>>
}

export namespace ResetUserPasswordUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
