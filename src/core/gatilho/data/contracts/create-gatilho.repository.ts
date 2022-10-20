import { ActionResult } from "@/core/common/domain/action-result";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";

export interface CreateGatilhoRepositoryContract {
  create(
    params: CreateGatilhoRepositoryContract.Params
  ): Promise<ActionResult<CreateGatilhoRepositoryContract.Response, any>>
}

export namespace CreateGatilhoRepositoryContract {
  export type Params = CreateGatilhoUseCaseContract.Params;
  export type Response = CreateGatilhoUseCaseContract.Response;
}
