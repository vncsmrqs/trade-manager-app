import { ActionResult } from "@/core/common/domain/action-result";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";

export interface ListLocalStopRepositoryContract {
  list(
    params: ListLocalStopRepositoryContract.Params
  ): Promise<ActionResult<ListLocalStopRepositoryContract.Response, string>>
}

export namespace ListLocalStopRepositoryContract {
  export type Params = ListLocalStopUseCaseContract.Params;
  export type Response = ListLocalStopUseCaseContract.Response;
}
