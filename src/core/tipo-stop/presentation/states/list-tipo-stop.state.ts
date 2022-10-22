import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export type BaseTipoStopListState = {
  search?: string;
  itemsPerPage?: number;
  items: TipoStopEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListTipoStopState = {
  kind: "InitialListTipoStopState";
}

export type LoadingListTipoStopState = {
  kind: "LoadingListTipoStopState";
}

export type LoadedListTipoStopState = {
  kind: "LoadedListTipoStopState";
}

export type ErrorListTipoStopState = {
  kind: "ErrorListTipoStopState";
  error: string;
}

type AvailableStates = (
  InitialListTipoStopState |
  LoadingListTipoStopState |
  LoadedListTipoStopState |
  ErrorListTipoStopState
);

export type ListTipoStopState = AvailableStates & BaseTipoStopListState;

export const initialListTipoStopState : ListTipoStopState = {
  kind: "InitialListTipoStopState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
