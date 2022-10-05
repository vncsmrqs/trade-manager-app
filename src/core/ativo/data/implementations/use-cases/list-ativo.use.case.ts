import { ActionResult } from "@/core/common/domain/action-result";
import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { ListAtivoUseCaseContract } from "@/core/ativo/domain/use-cases/list-ativo.use-case";

export class ListAtivoUseCase implements ListAtivoUseCaseContract {
  constructor(
    private listAtivoRepository: ListAtivoRepositoryContract
  ) {}

  async execute(
    params: ListAtivoRepositoryContract.Params
  ): Promise<ActionResult<ListAtivoUseCaseContract.Response, string>> {
    return this.listAtivoRepository.list(params);
  }
}
