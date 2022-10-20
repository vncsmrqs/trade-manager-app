import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";

export interface CreateTipoEntradaRepositoryContract {
  create(
    params: CreateTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<CreateTipoEntradaRepositoryContract.Response, any>>
}

export namespace CreateTipoEntradaRepositoryContract {
  export type Params = CreateTipoEntradaUseCaseContract.Params;
  export type Response = CreateTipoEntradaUseCaseContract.Response;
}
