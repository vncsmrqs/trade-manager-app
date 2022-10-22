import { ActionResult } from "@/core/common/domain/action-result";
import { ListLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/list-local-stop.repository";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";

export class ListLocalStopUseCase implements ListLocalStopUseCaseContract {
  constructor(
    private listLocalStopRepository: ListLocalStopRepositoryContract
  ) {}

  async execute(
    params: ListLocalStopRepositoryContract.Params
  ): Promise<ActionResult<ListLocalStopUseCaseContract.Response, string>> {
    return this.listLocalStopRepository.list(params);
  }
}
