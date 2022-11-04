import { ActionResult } from "@/core/common/domain/action-result";

export interface CreateUserUseCaseContract {
  execute(params: CreateUserUseCaseContract.Params): Promise<ActionResult<CreateUserUseCaseContract.Response, string>>
}

export namespace CreateUserUseCaseContract {
  export type Params = {
    name: string;
    lastname: string;
    email: string;
    imagePath?: string;
    accessDeadline?: string;
    active: boolean;
  };
  export type Response = void;
}
