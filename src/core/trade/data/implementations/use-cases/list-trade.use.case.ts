import { ActionResult } from "@/core/common/domain/action-result";
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";

export class ListTradeUseCase implements ListTradeUseCaseContract {
  constructor(
    private listTradeRepository: ListTradeRepositoryContract
  ) {}

  async execute(
    params: ListTradeRepositoryContract.Params
  ): Promise<ActionResult<ListTradeUseCaseContract.Response, string>> {
    return this.listTradeRepository.list(params);
  }
}
