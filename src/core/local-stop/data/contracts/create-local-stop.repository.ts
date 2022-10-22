import { ActionResult } from "@/core/common/domain/action-result";
import { CreateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/create-local-stop.use-case";

export interface CreateLocalStopRepositoryContract {
  create(
    params: CreateLocalStopRepositoryContract.Params
  ): Promise<ActionResult<CreateLocalStopRepositoryContract.Response, any>>
}

export namespace CreateLocalStopRepositoryContract {
  export type Params = CreateLocalStopUseCaseContract.Params;
  export type Response = CreateLocalStopUseCaseContract.Response;
}
