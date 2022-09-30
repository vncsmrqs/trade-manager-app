import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export type BaseGatilhoListState = {
  search?: string;
  itemsPerPage: number;
  items: GatilhoEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialGatilhoViewState = {
  kind: "InitialGatilhoViewState";
}

export type LoadingGatilhoViewState = {
  kind: "LoadingGatilhoViewState";
}

export type LoadedGatilhoViewState = {
  kind: "LoadedGatilhoViewState";
  items: GatilhoEntity[];
  page: number;
  pageCount: number;
}

export type ErrorGatilhoViewState = {
  kind: "ErrorGatilhoViewState";
  error: string;
}

type AvailableStates = (
  InitialGatilhoViewState |
  LoadingGatilhoViewState |
  LoadedGatilhoViewState |
  ErrorGatilhoViewState
);

export type GatilhoViewState = AvailableStates & BaseGatilhoListState;

export const initialGatilhoViewState : GatilhoViewState = {
  kind: "InitialGatilhoViewState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
