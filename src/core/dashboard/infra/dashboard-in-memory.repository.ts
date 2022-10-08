import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";
import { GetTradeSumByIntervalRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-interval.repository";
import { GetTradeSumBySetupRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-setup.respository";
import { GetTradeSumByWeekdayRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-weekday.respository";
import { ActionResult } from "@/core/common/domain/action-result";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { IntervalTradesItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { TradeSumBySetupItem } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { TradesByWeekdayItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { WeekdayEnum } from "@/core/dashboard/presentation/state/dashboard.state";

export class DashboardInMemoryRepository implements
  GetTradeSumRepositoryContract,
  GetTradeSumByIntervalRepositoryContract,
  GetTradeSumBySetupRepositoryContract,
  GetTradeSumByWeekdayRepositoryContract
{
  getTradeSum(
    params: GetTradeSumRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumRepositoryContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumResult })), 3000);
    });
  }

  getTradeSumBySetup(
    params: GetTradeSumBySetupRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupRepositoryContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumBySetup })), 3000);
    });
  }

  getTradeSumByWeekday(
    params: GetTradeSumByWeekdayRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayRepositoryContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradeSumByWeekdayResult })), 3000);
    });
  }

  getTradeSumByInterval(
    params: GetTradeSumByIntervalRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalRepositoryContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ActionResult.success({ items: tradesByIntervalResult })), 3000);
    });
  }
}

const tradeSumResult: ResultadoTradeValue[] = [
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
];

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

const tradesByIntervalResult: IntervalTradesItemType[] = intervals.map((interval, index) => ({
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

const generateItems = (num = 7): TradeSumBySetupItem[] => {
  return Array.from(Array(num).keys()).map((i) => ({
    position: (i + 1),
    setupNome: 'Setup ' + (i + 1) ,
    items: [
      {
        name: 'gain',
        value: 10 + i,
      },
      {
        name: 'loss',
        value: 10 + i,
      },
      {
        name: '0x0',
        value: 10 + i,
      },
    ],
  }));
}
const tradeSumBySetup = generateItems();

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
