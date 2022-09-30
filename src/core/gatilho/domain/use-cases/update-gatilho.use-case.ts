import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface UpdateGatilhoUseCaseContract {
  execute(params: UpdateGatilhoUseCaseContract.Params): Promise<ActionResult<UpdateGatilhoUseCaseContract.Response, string>>
}

export namespace UpdateGatilhoUseCaseContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
  export type Response = void;
}
