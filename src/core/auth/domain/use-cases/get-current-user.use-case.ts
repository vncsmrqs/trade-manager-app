import { ActionResult } from "@/core/common/domain/action-result";
import { UserEntity } from "@/core/auth/domain/entities/user.entity";

export interface GetCurrentUserUseCaseContract {
  execute(
    params: GetCurrentUserUseCaseContract.Params
  ): Promise<ActionResult<GetCurrentUserUseCaseContract.Response, string>>
}

export namespace GetCurrentUserUseCaseContract {
  export type Params = {
    token: string;
  }

  export type Response = {
    user: UserEntity;
  }
}
