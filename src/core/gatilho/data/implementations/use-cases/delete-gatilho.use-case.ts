import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";

export class DeleteGatilhoUseCase implements DeleteGatilhoUseCaseContract {
  constructor(
    private deleteGatilhoRepository: DeleteGatilhoRepositoryContract
  ) {}

  async execute(
    params: DeleteGatilhoUseCaseContract.Params
  ): Promise<ActionResult<DeleteGatilhoUseCaseContract.Response, any>> {
    return this.deleteGatilhoRepository.delete(params);
  }
}
