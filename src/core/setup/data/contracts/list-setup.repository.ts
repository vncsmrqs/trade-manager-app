import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface ListSetupRepositoryContract {
  list(
    params: ListSetupRepositoryContract.Params
  ): Promise<ActionResult<ListSetupRepositoryContract.Response, string>>
}

export namespace ListSetupRepositoryContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage: number;
  }

  export type Response = {
    items: SetupEntity[];
    page: number;
    pageCount: number;
  }
}
