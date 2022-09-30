import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface CreateSetupUseCaseContract {
  execute(params: CreateSetupUseCaseContract.Params): Promise<ActionResult<CreateSetupUseCaseContract.Response, string>>
}

export namespace CreateSetupUseCaseContract {
  export type Params = {
    name: string,
    active?: boolean,
  };
  export type Response = void;
}
