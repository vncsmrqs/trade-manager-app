import { ActionResult } from "@/core/common/domain/action-result";
import { UserEntity } from "@/core/user/domain/entities/user.entity";

export interface ListUserUseCaseContract {
  execute(params: ListUserUseCaseContract.Params): Promise<ActionResult<ListUserUseCaseContract.Response, string>>
}

export namespace ListUserUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    active?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: UserEntity[];
    page: number;
    pageCount: number;
  }
}
