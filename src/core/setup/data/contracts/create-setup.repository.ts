import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface CreateSetupRepositoryContract {
  create(params: CreateSetupRepositoryContract.Params): Promise<ActionResult<void, any>>
}

export namespace CreateSetupRepositoryContract {
  export type Params = {
    name: string;
    description?: string;
  };
}
