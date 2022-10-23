import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";
import { UpdateUserRepositoryContract } from "@/core/user/data/contracts/update-user.repository";

export class UpdateUserUseCase implements UpdateUserUseCaseContract {
  constructor(
    private updateUserRepository: UpdateUserRepositoryContract
  ) {}

  async execute(
    params: UpdateUserUseCaseContract.Params
  ): Promise<ActionResult<UpdateUserUseCaseContract.Response, any>> {
    return this.updateUserRepository.update(params);
  }
}
