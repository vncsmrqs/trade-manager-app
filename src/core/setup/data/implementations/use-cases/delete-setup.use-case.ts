import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/delete-setup.use-case";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

export class DeleteSetupUseCase implements DeleteSetupUseCaseContract {
  constructor(
    private deleteSetupRepository: DeleteSetupRepositoryContract
  ) {}

  async execute(
    params: DeleteSetupUseCaseContract.Params
  ): Promise<ActionResult<DeleteSetupUseCaseContract.Response, any>> {
    return this.deleteSetupRepository.delete(params);
  }
}
