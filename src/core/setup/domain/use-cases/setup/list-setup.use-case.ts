import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface ListSetupUseCaseContract {
  execute(params: ListSetupUseCaseContract.Params): Promise<ActionResult<ListSetupUseCaseContract.Response, any>>
}

export namespace ListSetupUseCaseContract {
  export type Params = {};
  export type Response = SetupEntity[];
}
