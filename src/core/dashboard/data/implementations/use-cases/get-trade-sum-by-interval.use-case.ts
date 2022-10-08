import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumByIntervalUseCaseContract,
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { GetTradeSumByIntervalRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-interval.repository";

export class GetTradeSumByIntervalUseCase implements GetTradeSumByIntervalUseCaseContract {
  constructor(
    private getTradeSumByIntervalRepository: GetTradeSumByIntervalRepositoryContract
  ) {}
  execute(
    params: GetTradeSumByIntervalUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalUseCaseContract.Response, string>> {
    return this.getTradeSumByIntervalRepository.getTradeSumByInterval(params);
  }
}
