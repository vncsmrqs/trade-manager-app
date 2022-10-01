import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/create-setup.use-case";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";

export class CreateSetupUseCase implements CreateSetupUseCaseContract {
  constructor(
    private createSetupRepository: CreateSetupRepositoryContract
  ) {}

  async execute(
    params: CreateSetupUseCaseContract.Params
  ): Promise<ActionResult<CreateSetupUseCaseContract.Response, any>> {
    return this.createSetupRepository.create(params);
  }
}
