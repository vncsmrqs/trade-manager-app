import { ActionResult } from "@/core/common/domain/action-result";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";

export class CreateGatilhoUseCase implements CreateGatilhoUseCaseContract {
  constructor(
    private createGatilhoRepository: CreateGatilhoRepositoryContract
  ) {}

  async execute(
    params: CreateGatilhoUseCaseContract.Params
  ): Promise<ActionResult<CreateGatilhoUseCaseContract.Response, any>> {
    return this.createGatilhoRepository.create(params);
  }
}
