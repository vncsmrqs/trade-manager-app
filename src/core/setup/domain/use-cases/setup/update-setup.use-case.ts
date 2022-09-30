import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface UpdateSetupUseCaseContract {
  execute(params: UpdateSetupUseCaseContract.Params): Promise<ActionResult<UpdateSetupUseCaseContract.Response, string>>
}

export namespace UpdateSetupUseCaseContract {
  export type Params = {
    id: string;
    name?: string;
    active?: boolean;
  };
  export type Response = SetupEntity;
}