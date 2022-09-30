import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface CreateGatilhoRepositoryContract {
  create(params: CreateGatilhoRepositoryContract.Params): Promise<ActionResult<void, any>>
}

export namespace CreateGatilhoRepositoryContract {
  export type Params = {
    name: string;
    description?: string;
  };
}
