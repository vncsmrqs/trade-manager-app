import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export type BaseGatilhoListState = {
  search?: string;
  itemsPerPage?: number;
  items: GatilhoEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListGatilhoState = {
  kind: "InitialListGatilhoState";
}

export type LoadingListGatilhoState = {
  kind: "LoadingListGatilhoState";
}

export type LoadedListGatilhoState = {
  kind: "LoadedListGatilhoState";
}

export type ErrorListGatilhoState = {
  kind: "ErrorListGatilhoState";
  error: string;
}

type AvailableStates = (
  InitialListGatilhoState |
  LoadingListGatilhoState |
  LoadedListGatilhoState |
  ErrorListGatilhoState
);

export type ListGatilhoState = AvailableStates & BaseGatilhoListState;

export const initialListGatilhoState : ListGatilhoState = {
  kind: "InitialListGatilhoState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
