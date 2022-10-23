import { ActionResult } from "@/core/common/domain/action-result";
import { ListUserUseCaseContract } from "@/core/user/domain/use-cases/list-user.use-case";

export interface ListUserRepositoryContract {
  list(
    params: ListUserRepositoryContract.Params
  ): Promise<ActionResult<ListUserRepositoryContract.Response, string>>
}

export namespace ListUserRepositoryContract {
  export type Params = ListUserUseCaseContract.Params;
  export type Response = ListUserUseCaseContract.Response;
}
