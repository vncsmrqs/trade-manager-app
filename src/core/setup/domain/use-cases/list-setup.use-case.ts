import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface ListSetupUseCaseContract {
  execute(params: ListSetupUseCaseContract.Params): Promise<ActionResult<ListSetupUseCaseContract.Response, string>>
}

export namespace ListSetupUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: SetupEntity[];
    page: number;
    pageCount: number;
  }
}
