import { ActionResult } from "@/core/common/domain/action-result";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";

export class UpdateTradeUseCase implements UpdateTradeUseCaseContract {
  constructor(
    private updateTradeRepository: UpdateTradeRepositoryContract
  ) {}

  async execute(
    params: UpdateTradeUseCaseContract.Params
  ): Promise<ActionResult<UpdateTradeUseCaseContract.Response, any>> {
    return this.updateTradeRepository.update(params);
  }
}
