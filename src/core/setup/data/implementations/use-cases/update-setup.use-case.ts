import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";

export class UpdateSetupUseCase implements UpdateSetupUseCaseContract {
  constructor(
    private updateSetupRepository: UpdateSetupRepositoryContract
  ) {}

  async execute(
    params: UpdateSetupUseCaseContract.Params
  ): Promise<ActionResult<UpdateSetupUseCaseContract.Response, any>> {
    return this.updateSetupRepository.update(params);
  }
}
