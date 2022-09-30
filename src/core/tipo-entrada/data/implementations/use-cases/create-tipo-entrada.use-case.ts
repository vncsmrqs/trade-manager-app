import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";

export class CreateTipoEntradaUseCase implements CreateTipoEntradaUseCaseContract {
  constructor(
    private createTipoEntradaRepository: CreateTipoEntradaRepositoryContract
  ) {}

  async execute(
    params: CreateTipoEntradaUseCaseContract.Params
  ): Promise<ActionResult<CreateTipoEntradaUseCaseContract.Response, any>> {
    return this.createTipoEntradaRepository.create(params);
  }
}
