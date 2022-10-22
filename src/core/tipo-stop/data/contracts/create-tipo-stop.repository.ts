import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/create-tipo-stop.use-case";

export interface CreateTipoStopRepositoryContract {
  create(
    params: CreateTipoStopRepositoryContract.Params
  ): Promise<ActionResult<CreateTipoStopRepositoryContract.Response, any>>
}

export namespace CreateTipoStopRepositoryContract {
  export type Params = CreateTipoStopUseCaseContract.Params;
  export type Response = CreateTipoStopUseCaseContract.Response;
}
