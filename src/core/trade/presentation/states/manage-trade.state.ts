import { TradeEntity } from "@/core/trade/domain/entities/trade.entity";

export type BaseManageTradeState = {
  item?: TradeEntity;
  error?: string;
  isUploadingImage: boolean;
  uploadImagePercentage: number;
  uploadImageError?: string;
}
export type InitialManageTradeState = {
  kind: "InitialManageTradeState";
}

export type LoadingManageTradeState = {
  kind: "LoadingManageTradeState";
}

export type LoadedManageTradeState = {
  kind: "LoadedManageTradeState";
}

export type ErrorManageTradeState = {
  kind: "ErrorManageTradeState";
}

export type ManageTradeState = (
  InitialManageTradeState |
  LoadingManageTradeState |
  LoadedManageTradeState |
  ErrorManageTradeState
) & BaseManageTradeState;

export const initialManageTradeState: ManageTradeState = {
  kind: "InitialManageTradeState",
  error: undefined,
  uploadImagePercentage: 0,
  isUploadingImage: false,
};
