import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface DeleteGatilhoUseCaseContract {
  execute(params: DeleteGatilhoUseCaseContract.Params): Promise<ActionResult<DeleteGatilhoUseCaseContract.Response, string>>
}

export namespace DeleteGatilhoUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
