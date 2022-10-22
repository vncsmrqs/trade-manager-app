import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/update-local-stop.use-case";
import { UpdateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/update-local-stop.repository";

export class UpdateLocalStopUseCase implements UpdateLocalStopUseCaseContract {
  constructor(
    private updateLocalStopRepository: UpdateLocalStopRepositoryContract
  ) {}

  async execute(
    params: UpdateLocalStopUseCaseContract.Params
  ): Promise<ActionResult<UpdateLocalStopUseCaseContract.Response, any>> {
    return this.updateLocalStopRepository.update(params);
  }
}
