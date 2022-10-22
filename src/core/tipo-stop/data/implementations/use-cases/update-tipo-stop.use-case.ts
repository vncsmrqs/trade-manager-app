import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/update-tipo-stop.use-case";
import { UpdateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/update-tipo-stop.repository";

export class UpdateTipoStopUseCase implements UpdateTipoStopUseCaseContract {
  constructor(
    private updateTipoStopRepository: UpdateTipoStopRepositoryContract
  ) {}

  async execute(
    params: UpdateTipoStopUseCaseContract.Params
  ): Promise<ActionResult<UpdateTipoStopUseCaseContract.Response, any>> {
    return this.updateTipoStopRepository.update(params);
  }
}
