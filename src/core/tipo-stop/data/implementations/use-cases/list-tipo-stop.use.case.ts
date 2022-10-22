import { ActionResult } from "@/core/common/domain/action-result";
import { ListTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/list-tipo-stop.repository";
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";

export class ListTipoStopUseCase implements ListTipoStopUseCaseContract {
  constructor(
    private listTipoStopRepository: ListTipoStopRepositoryContract
  ) {}

  async execute(
    params: ListTipoStopRepositoryContract.Params
  ): Promise<ActionResult<ListTipoStopUseCaseContract.Response, string>> {
    return this.listTipoStopRepository.list(params);
  }
}
