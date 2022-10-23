import { ActionResult } from "@/core/common/domain/action-result";
import { UserEntity } from "@/core/user/domain/entities/user.entity";

export interface UpdateUserUseCaseContract {
  execute(params: UpdateUserUseCaseContract.Params): Promise<ActionResult<UpdateUserUseCaseContract.Response, string>>
}

export namespace UpdateUserUseCaseContract {
  export type Params = {
    id: string;
    name?: string;
    lastname?: string;
    imagePath?: string;
    active?: boolean;
  };
  export type Response = void;
}
