import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface DeleteSetupUseCaseContract {
  execute(params: DeleteSetupUseCaseContract.Params): Promise<ActionResult<DeleteSetupUseCaseContract.Response, string>>
}

export namespace DeleteSetupUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
