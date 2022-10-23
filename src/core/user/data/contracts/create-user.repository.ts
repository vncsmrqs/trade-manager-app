import { ActionResult } from "@/core/common/domain/action-result";
import { CreateUserUseCaseContract } from "@/core/user/domain/use-cases/create-user.use-case";

export interface CreateUserRepositoryContract {
  create(
    params: CreateUserRepositoryContract.Params
  ): Promise<ActionResult<CreateUserRepositoryContract.Response, any>>
}

export namespace CreateUserRepositoryContract {
  export type Params = CreateUserUseCaseContract.Params;
  export type Response = CreateUserUseCaseContract.Response;
}
