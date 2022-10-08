import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumByWeekdayUseCaseContract,
  TradesByWeekdayItemType
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { WeekdayEnum } from "@/core/dashboard/presentation/state/dashboard.state";
import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";
import { GetTradeSumByWeekdayRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-weekday.respository";

export class GetTradeSumByWeekdayUseCase implements GetTradeSumByWeekdayUseCaseContract {
  constructor(
    private getTradeSumByWeekdayRepository: GetTradeSumByWeekdayRepositoryContract
  ) {}
  execute(
    params: GetTradeSumByWeekdayUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayUseCaseContract.Response, string>> {
    return this.getTradeSumByWeekdayRepository.getTradeSumByWeekday(params);
  }
}
