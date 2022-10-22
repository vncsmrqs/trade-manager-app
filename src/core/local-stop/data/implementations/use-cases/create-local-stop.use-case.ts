import { ActionResult } from "@/core/common/domain/action-result";
import { CreateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/create-local-stop.use-case";
import { CreateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/create-local-stop.repository";

export class CreateLocalStopUseCase implements CreateLocalStopUseCaseContract {
  constructor(
    private createLocalStopRepository: CreateLocalStopRepositoryContract
  ) {}

  async execute(
    params: CreateLocalStopUseCaseContract.Params
  ): Promise<ActionResult<CreateLocalStopUseCaseContract.Response, any>> {
    return this.createLocalStopRepository.create(params);
  }
}
