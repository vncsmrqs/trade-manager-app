import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumByWeekdayUseCaseContract,
  TradesByWeekdayItemType
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { WeekdayEnum } from "@/core/dashboard/presentation/state/dashboard.state";

export class GetTradeSumByWeekdayUseCase implements GetTradeSumByWeekdayUseCaseContract {
  execute(
    params: GetTradeSumByWeekdayUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumByWeekdayResult })), 3000);
    });
  }
}

const tradeSumByWeekdayResult: TradesByWeekdayItemType[] = [
  {
    weekday: WeekdayEnum.SEG,
    items: [
      {
        name: 'loss',
        value: 10,
      },
      {
        name: 'gain',
        value: 20,
      },
      {
        name: '0x0',
        value: 30,
      },
    ]
  },
  {
    weekday: WeekdayEnum.TER,
    items: [
      {
        name: 'loss',
        value: 10,
      },
      {
        name: 'gain',
        value: 20,
      },
      {
        name: '0x0',
        value: 30,
      },
    ]
  },
  {
    weekday: WeekdayEnum.QUA,
    items: [
      {
        name: 'loss',
        value: 10,
      },
      {
        name: 'gain',
        value: 20,
      },
      {
        name: '0x0',
        value: 30,
      },
    ]
  },
  {
    weekday: WeekdayEnum.QUI,
    items: [
      {
        name: 'loss',
        value: 10,
      },
      {
        name: 'gain',
        value: 20,
      },
      {
        name: '0x0',
        value: 30,
      },
    ]
  },
  {
    weekday: WeekdayEnum.SEX,
    items: [
      {
        name: 'loss',
        value: 10,
      },
      {
        name: 'gain',
        value: 20,
      },
      {
        name: '0x0',
        value: 30,
      },
    ]
  },
];
