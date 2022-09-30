import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";

export class UpdateTipoEntradaUseCase implements UpdateTipoEntradaUseCaseContract {
  constructor(
    private updateTipoEntradaRepository: UpdateTipoEntradaRepositoryContract
  ) {}

  async execute(
    params: UpdateTipoEntradaUseCaseContract.Params
  ): Promise<ActionResult<UpdateTipoEntradaUseCaseContract.Response, any>> {
    return this.updateTipoEntradaRepository.update(params);
  }
}
