import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteTradeUseCaseContract } from "@/core/trade/domain/use-cases/delete-trade.use-case";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";

export class DeleteTradeUseCase implements DeleteTradeUseCaseContract {
  constructor(
    private deleteTradeRepository: DeleteTradeRepositoryContract
  ) {}

  async execute(
    params: DeleteTradeUseCaseContract.Params
  ): Promise<ActionResult<DeleteTradeUseCaseContract.Response, any>> {
    return this.deleteTradeRepository.delete(params);
  }
}
