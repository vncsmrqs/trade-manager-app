import { ActionResult } from "@/core/common/domain/action-result";
import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";

export class ListGatilhoUseCase implements ListGatilhoUseCaseContract {
  constructor(
    private listGatilhoRepository: ListGatilhoRepositoryContract
  ) {}

  async execute(
    params: ListGatilhoRepositoryContract.Params
  ): Promise<ActionResult<ListGatilhoUseCaseContract.Response, string>> {
    return this.listGatilhoRepository.list(params);
  }
}
