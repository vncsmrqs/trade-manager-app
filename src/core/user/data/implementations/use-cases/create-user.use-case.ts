import { ActionResult } from "@/core/common/domain/action-result";
import { CreateUserUseCaseContract } from "@/core/user/domain/use-cases/create-user.use-case";
import { CreateUserRepositoryContract } from "@/core/user/data/contracts/create-user.repository";

export class CreateUserUseCase implements CreateUserUseCaseContract {
  constructor(
    private createUserRepository: CreateUserRepositoryContract
  ) {}

  async execute(
    params: CreateUserUseCaseContract.Params
  ): Promise<ActionResult<CreateUserUseCaseContract.Response, any>> {
    return this.createUserRepository.create(params);
  }
}
