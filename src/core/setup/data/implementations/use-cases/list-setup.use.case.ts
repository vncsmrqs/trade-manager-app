import { ActionResult } from "@/core/common/domain/action-result";
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";

export class ListSetupUseCase implements ListSetupUseCaseContract {
  constructor(
    private listSetupRepository: ListSetupRepositoryContract
  ) {}

  async execute(
    params: ListSetupRepositoryContract.Params
  ): Promise<ActionResult<ListSetupUseCaseContract.Response, string>> {
    return this.listSetupRepository.list(params);
  }
}
