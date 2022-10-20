import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/create-setup.use-case";

export interface CreateSetupRepositoryContract {
  create(
    params: CreateSetupRepositoryContract.Params
  ): Promise<ActionResult<CreateSetupRepositoryContract.Response, any>>
}

export namespace CreateSetupRepositoryContract {
  export type Params = CreateSetupUseCaseContract.Params;
  export type Response = void;
}
