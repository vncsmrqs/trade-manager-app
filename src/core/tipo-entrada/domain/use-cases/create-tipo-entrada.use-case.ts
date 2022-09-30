import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface CreateGatilhoUseCaseContract {
  execute(params: CreateGatilhoUseCaseContract.Params): Promise<ActionResult<CreateGatilhoUseCaseContract.Response, string>>
}

export namespace CreateGatilhoUseCaseContract {
  export type Params = {
    name: string,
    active?: boolean,
  };
  export type Response = void;
}
