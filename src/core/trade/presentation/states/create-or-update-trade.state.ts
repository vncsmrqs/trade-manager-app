import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export type BaseCreateTradeState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateTradeState = {
  kind: "InitialCreateOrUpdateTradeState";
}

export type SavingTradeState = {
  kind: "SavingTradeState";
}

export type CreatedOrUpdatedTradeState = {
  kind: "CreatedOrUpdatedTradeState";
}

export type ErrorSavingTradeState = {
  kind: "ErrorSavingTradeState";
}

export type CreateOrUpdateTradeState = (
  InitialCreateTradeState |
  SavingTradeState |
  CreatedOrUpdatedTradeState |
  ErrorSavingTradeState
) & BaseCreateTradeState;

export const initialCreateTradeState: CreateOrUpdateTradeState = {
  kind: "InitialCreateOrUpdateTradeState",
  formDisabled: false,
  error: undefined,
};
