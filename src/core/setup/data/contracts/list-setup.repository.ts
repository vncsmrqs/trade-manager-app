import { ActionResult } from "@/core/common/domain/action-result";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";

export interface ListSetupRepositoryContract {
  list(
    params: ListSetupRepositoryContract.Params
  ): Promise<ActionResult<ListSetupRepositoryContract.Response, string>>
}

export namespace ListSetupRepositoryContract {
  export type Params = ListSetupUseCaseContract.Params;
  export type Response = ListSetupUseCaseContract.Response;
}
