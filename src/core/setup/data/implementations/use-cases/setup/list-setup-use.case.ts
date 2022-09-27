import { ActionResult } from "@/core/common/domain/action-result";
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/setup/list-setup.repository";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";

export class ListSetupUseCase implements ListSetupUseCaseContract {
  constructor(
    private listSetupRepository: ListSetupRepositoryContract
  ) {}

  async execute(): Promise<ActionResult<ListSetupUseCaseContract.Response, any>> {
    return this.listSetupRepository.list();
  }
}
