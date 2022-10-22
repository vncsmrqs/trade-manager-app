import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/delete-tipo-stop.use-case";
import { DeleteTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/delete-tipo-stop.repository";

export class DeleteTipoStopUseCase implements DeleteTipoStopUseCaseContract {
  constructor(
    private deleteTipoStopRepository: DeleteTipoStopRepositoryContract
  ) {}

  async execute(
    params: DeleteTipoStopUseCaseContract.Params
  ): Promise<ActionResult<DeleteTipoStopUseCaseContract.Response, any>> {
    return this.deleteTipoStopRepository.delete(params);
  }
}
