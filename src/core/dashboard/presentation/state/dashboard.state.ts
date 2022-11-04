import { TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { TradesByWeekdayItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { TradeSumBySetupItem } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { IntervalTradesItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import moment from "moment";

export enum WeekdayEnum {
  SEG = 'SEG',
  TER = 'TER',
  QUA = 'QUA',
  QUI = 'QUI',
  SEX = 'SEX',
  SAB = 'SAB',
  DOM = 'DOM',
}

export type DashboardSearchParams = {
  startDate: string;
  endDate: string;
  ativoId?: string;
}

export type BaseDashboardState = {
  searchParams: DashboardSearchParams,
  rankingOfSetups: {
    loading: boolean,
    items: TradeSumBySetupItem[],
    error?: string,
  },
  tradesByWeekday: {
    loading: boolean,
    items: TradesByWeekdayItemType[],
    error?: string,
  },
  totalTrades: {
    loading: boolean,
    items: ResultadoTradeValue[],
    error?: string,
  },
  morningTrades: {
    loading: boolean,
    items: ResultadoTradeValue[],
    error?: string,
  },
  eveningTrades: {
    loading: boolean,
    items: ResultadoTradeValue[],
    error?: string,
  },
  tradesByInterval: {
    loading: boolean,
    items: IntervalTradesItemType[],
    error?: string,
  },
  error?: string;
}

export type InitialDashboardtate = {
  kind: "InitialDashboardState";
}

export type LoadingDashboardState = {
  kind: "LoadingDashboardState";
}

export type LoadedDashboardState = {
  kind: "LoadedDashboardState";
}

export type ErrorDashboardState = {
  kind: "ErrorDashboardState";
}

export type DashboardState = (
  InitialDashboardtate |
  LoadingDashboardState |
  LoadedDashboardState |
  ErrorDashboardState
  ) & BaseDashboardState;

export const initialDashboardState: DashboardState = {
  kind: "InitialDashboardState",
  searchParams: {
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    ativoId: undefined,
  },
  rankingOfSetups: {
    loading: false,
    items: [],
  },
  tradesByWeekday: {
    loading: false,
    items: [],
  },
  totalTrades: {
    loading: false,
    items: [],
  },
  morningTrades: {
    loading: false,
    items: [],
  },
  eveningTrades: {
    loading: false,
    items: [],
  },
  tradesByInterval: {
    loading: false,
    items: [],
  },
};
