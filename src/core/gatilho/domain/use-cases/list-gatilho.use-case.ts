import { ActionResult } from "@/core/common/domain/action-result";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export interface ListGatilhoUseCaseContract {
  execute(params: ListGatilhoUseCaseContract.Params): Promise<ActionResult<ListGatilhoUseCaseContract.Response, string>>
}

export namespace ListGatilhoUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: GatilhoEntity[];
    page: number;
    pageCount: number;
  }
}
