import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export type BaseDeleteTradeState = {
  error?: string;
}
export type InitialDeleteTradeState = {
  kind: "InitialDeleteTradeState";
}

export type DeletingTradeState = {
  kind: "DeletingTradeState";
}

export type DeletedTradeState = {
  kind: "DeletedTradeState";
}

export type ErrorDeleteTradeState = {
  kind: "ErrorDeleteTradeState";
}

export type DeleteTradeState = (
  InitialDeleteTradeState |
  DeletingTradeState |
  DeletedTradeState |
  ErrorDeleteTradeState
) & BaseDeleteTradeState;

export const initialDeleteTradeState: DeleteTradeState = {
  kind: "InitialDeleteTradeState",
  error: undefined,
};
