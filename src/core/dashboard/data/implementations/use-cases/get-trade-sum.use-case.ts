import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumUseCaseContract,
} from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";

export class GetTradeSumUseCase implements GetTradeSumUseCaseContract{
  constructor(
    private getTradeSumRepository: GetTradeSumRepositoryContract
  ) {}
  execute(
    params: GetTradeSumUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumUseCaseContract.Response, string>> {
    return this.getTradeSumRepository.getTradeSum(params);
  }
}
