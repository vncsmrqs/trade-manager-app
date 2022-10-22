import { ActionResult } from "@/core/common/domain/action-result";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";

export interface ListGatilhoRepositoryContract {
  list(
    params: ListGatilhoRepositoryContract.Params
  ): Promise<ActionResult<ListGatilhoRepositoryContract.Response, string>>
}

export namespace ListGatilhoRepositoryContract {
  export type Params = ListGatilhoUseCaseContract.Params;
  export type Response = ListGatilhoUseCaseContract.Response;
}
