import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";

export class CreateTradeUseCase implements CreateTradeUseCaseContract {
  constructor(
    private createTradeRepository: CreateTradeRepositoryContract
  ) {}

  async execute(
    params: CreateTradeUseCaseContract.Params
  ): Promise<ActionResult<CreateTradeUseCaseContract.Response, any>> {
    return this.createTradeRepository.create(params);
  }
}
