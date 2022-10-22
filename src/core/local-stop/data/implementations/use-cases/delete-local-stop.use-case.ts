import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/delete-local-stop.use-case";
import { DeleteLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/delete-local-stop.repository";

export class DeleteLocalStopUseCase implements DeleteLocalStopUseCaseContract {
  constructor(
    private deleteLocalStopRepository: DeleteLocalStopRepositoryContract
  ) {}

  async execute(
    params: DeleteLocalStopUseCaseContract.Params
  ): Promise<ActionResult<DeleteLocalStopUseCaseContract.Response, any>> {
    return this.deleteLocalStopRepository.delete(params);
  }
}
