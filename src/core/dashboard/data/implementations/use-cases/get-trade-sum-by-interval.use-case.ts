import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumByIntervalUseCaseContract,
  IntervalTradesItemType
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";

export class GetTradeSumByIntervalUseCase implements GetTradeSumByIntervalUseCaseContract {
  execute(
    params: GetTradeSumByIntervalUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      console.log({ params });
      setTimeout(() => resolve(ActionResult.success({ items })), 3000);
    });
  }
}

const intervals = [
  '09:00 - 09:30',
  '09:30 - 10:00',
  '10:00 - 10:30',
  '10:30 - 11:00',
  '11:00 - 11:30',
  '11:30 - 12:00',
  '12:00 - 12:30',
  '12:30 - 13:00',
  '13:00 - 13:30',
  '13:30 - 14:00',
  '14:00 - 14:30',
  '14:30 - 15:00',
  '15:00 - 15:30',
  '15:30 - 16:00',
  '16:00 - 16:30',
  '16:30 - 17:00',
  '17:00 - 17:30',
  '17:30 - 18:00',
];

const items: IntervalTradesItemType[] = intervals.map((interval, index) => ({
  interval,
  items: [
    {
      name: 'loss',
      value: 10 + index,
    },
    {
      name: 'gain',
      value: 10 + index,
    },
    {
      name: '0x0',
      value: 10 + index,
    },
  ],
}));

