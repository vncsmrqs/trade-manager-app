import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";

export class DeleteTipoEntradaUseCase implements DeleteTipoEntradaUseCaseContract {
  constructor(
    private deleteTipoEntradaRepository: DeleteTipoEntradaRepositoryContract
  ) {}

  async execute(
    params: DeleteTipoEntradaUseCaseContract.Params
  ): Promise<ActionResult<DeleteTipoEntradaUseCaseContract.Response, any>> {
    return this.deleteTipoEntradaRepository.delete(params);
  }
}
