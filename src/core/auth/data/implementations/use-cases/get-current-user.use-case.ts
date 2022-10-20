import { ActionResult } from "@/core/common/domain/action-result";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";
import { GetCurrentUserRepositoryContract } from "@/core/auth/data/contracts/get-current-user.repository";

export class GetCurrentUserUseCase implements GetCurrentUserUseCaseContract {
  constructor(
    private getCurrentUserRepository: GetCurrentUserRepositoryContract
  ) {}

  execute(
    params?: GetCurrentUserUseCaseContract.Params
  ): Promise<ActionResult<GetCurrentUserUseCaseContract.Response, string>> {
    return this.getCurrentUserRepository.getCurrentUser(params);
  }
}
