import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";

export class UpdateGatilhoUseCase implements UpdateGatilhoUseCaseContract {
  constructor(
    private updateGatilhoRepository: UpdateGatilhoRepositoryContract
  ) {}

  async execute(
    params: UpdateGatilhoUseCaseContract.Params
  ): Promise<ActionResult<UpdateGatilhoUseCaseContract.Response, any>> {
    return this.updateGatilhoRepository.update(params);
  }
}
