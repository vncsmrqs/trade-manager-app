import { ActionResult } from "@/core/common/domain/action-result";
import { UserEntity } from "@/core/user/domain/entities/user.entity";

export interface DeleteUserUseCaseContract {
  execute(params: DeleteUserUseCaseContract.Params): Promise<ActionResult<DeleteUserUseCaseContract.Response, string>>
}

export namespace DeleteUserUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
