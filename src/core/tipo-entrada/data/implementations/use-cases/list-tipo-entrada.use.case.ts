import { ActionResult } from "@/core/common/domain/action-result";
import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";

export class ListTipoEntradaUseCase implements ListTipoEntradaUseCaseContract {
  constructor(
    private listTipoEntradaRepository: ListTipoEntradaRepositoryContract
  ) {}

  async execute(
    params: ListTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<ListTipoEntradaUseCaseContract.Response, string>> {
    return this.listTipoEntradaRepository.list(params);
  }
}
