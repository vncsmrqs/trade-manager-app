import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export type BaseDetailTradeState = {
  item?: TradeEntity;
  error?: string;
}
export type InitialDetailTradeState = {
  kind: "InitialDetailTradeState";
}

export type LoadingDetailTradeState = {
  kind: "LoadingDetailTradeState";
}

export type LoadedDetailTradeState = {
  kind: "LoadedDetailTradeState";
}

export type ErrorDetailTradeState = {
  kind: "ErrorDetailTradeState";
}

export type DetailTradeState = (
  InitialDetailTradeState |
  LoadingDetailTradeState |
  LoadedDetailTradeState |
  ErrorDetailTradeState
) & BaseDetailTradeState;

export const initialDetailTradeState: DetailTradeState = {
  kind: "InitialDetailTradeState",
  error: undefined,
};
