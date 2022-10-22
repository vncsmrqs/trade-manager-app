import { ActionResult } from "@/core/common/domain/action-result";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";

export interface ListTipoEntradaRepositoryContract {
  list(
    params: ListTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<ListTipoEntradaRepositoryContract.Response, string>>
}

export namespace ListTipoEntradaRepositoryContract {
  export type Params = ListTipoEntradaUseCaseContract.Params;
  export type Response = ListTipoEntradaUseCaseContract.Response;
}
