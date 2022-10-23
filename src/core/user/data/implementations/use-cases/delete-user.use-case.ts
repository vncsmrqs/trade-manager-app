import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteUserUseCaseContract } from "@/core/user/domain/use-cases/delete-user.use-case";
import { DeleteUserRepositoryContract } from "@/core/user/data/contracts/delete-user.repository";

export class DeleteUserUseCase implements DeleteUserUseCaseContract {
  constructor(
    private deleteUserRepository: DeleteUserRepositoryContract
  ) {}

  async execute(
    params: DeleteUserUseCaseContract.Params
  ): Promise<ActionResult<DeleteUserUseCaseContract.Response, any>> {
    return this.deleteUserRepository.delete(params);
  }
}
