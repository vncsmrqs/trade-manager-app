import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";

export interface UpdateUserRepositoryContract {
  update(params: UpdateUserRepositoryContract.Params): Promise<ActionResult<UpdateUserUseCaseContract.Response, string>>
}

export namespace UpdateUserRepositoryContract {
  export type Params = UpdateUserUseCaseContract.Params;
  export type Response = UpdateUserUseCaseContract.Response;
}
