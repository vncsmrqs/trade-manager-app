import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface CreateSetupUseCaseContract {
  execute(params: CreateSetupUseCaseContract.Params): Promise<ActionResult<CreateSetupUseCaseContract.Response, any>>
}

export namespace CreateSetupUseCaseContract {
  export type Params = {
    name: string,
    description?: string
  };
  export type Response = SetupEntity;
}
