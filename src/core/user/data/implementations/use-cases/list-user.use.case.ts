import { ActionResult } from "@/core/common/domain/action-result";
import { ListUserRepositoryContract } from "@/core/user/data/contracts/list-user.repository";
import { ListUserUseCaseContract } from "@/core/user/domain/use-cases/list-user.use-case";

export class ListUserUseCase implements ListUserUseCaseContract {
  constructor(
    private listUserRepository: ListUserRepositoryContract
  ) {}

  async execute(
    params: ListUserRepositoryContract.Params
  ): Promise<ActionResult<ListUserUseCaseContract.Response, string>> {
    return this.listUserRepository.list(params);
  }
}
