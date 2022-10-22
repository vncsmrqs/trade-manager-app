import { ActionResult } from "@/core/common/domain/action-result";
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";

export interface ListTipoStopRepositoryContract {
  list(
    params: ListTipoStopRepositoryContract.Params
  ): Promise<ActionResult<ListTipoStopRepositoryContract.Response, string>>
}

export namespace ListTipoStopRepositoryContract {
  export type Params = ListTipoStopUseCaseContract.Params;
  export type Response = ListTipoStopUseCaseContract.Response;
}
