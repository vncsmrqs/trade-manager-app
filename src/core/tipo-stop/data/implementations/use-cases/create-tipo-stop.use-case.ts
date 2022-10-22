import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/create-tipo-stop.use-case";
import { CreateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/create-tipo-stop.repository";

export class CreateTipoStopUseCase implements CreateTipoStopUseCaseContract {
  constructor(
    private createTipoStopRepository: CreateTipoStopRepositoryContract
  ) {}

  async execute(
    params: CreateTipoStopUseCaseContract.Params
  ): Promise<ActionResult<CreateTipoStopUseCaseContract.Response, any>> {
    return this.createTipoStopRepository.create(params);
  }
}
