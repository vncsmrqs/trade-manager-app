import { TradeEntity, TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";
import moment from "moment";

export type ListTradeFilter<T = any> = Record<string, T> & {
  setupId?: string[];
  ativoId?: string[];
  tipoEntradaId?: string[];
  gatilhoId?: string[];
  resultado?: TradeResultadoType[];
  startDate: string;
  endDate: string;
};

export type BaseTradeListState = {
  itemsPerPage?: number;
  page: number;
  pageCount: number;
  error?: string;
  filter: ListTradeFilter;
} & ListTradeUseCaseContract.Response;

export type InitialListTradeState = {
  kind: "InitialListTradeState";
}

export type LoadingListTradeState = {
  kind: "LoadingListTradeState";
}

export type LoadedListTradeState = {
  kind: "LoadedListTradeState";
}

export type ErrorListTradeState = {
  kind: "ErrorListTradeState";
  error: string;
}

type AvailableStates = (
  InitialListTradeState |
  LoadingListTradeState |
  LoadedListTradeState |
  ErrorListTradeState
);

export type ListTradeState = AvailableStates & BaseTradeListState;

export const initialListTradeState : ListTradeState = {
  kind: "InitialListTradeState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 1,
  metadata: {
    totalItems: 0,
    lossCount: 0,
    gainCount: 0,
    lossPercentage: 0,
    gainPercentage: 0,
  },
  filter: {
    startDate: moment().subtract(1, "month").format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
};
