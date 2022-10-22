import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export type BaseLocalStopListState = {
  search?: string;
  itemsPerPage?: number;
  items: LocalStopEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListLocalStopState = {
  kind: "InitialListLocalStopState";
}

export type LoadingListLocalStopState = {
  kind: "LoadingListLocalStopState";
}

export type LoadedListLocalStopState = {
  kind: "LoadedListLocalStopState";
}

export type ErrorListLocalStopState = {
  kind: "ErrorListLocalStopState";
  error: string;
}

type AvailableStates = (
  InitialListLocalStopState |
  LoadingListLocalStopState |
  LoadedListLocalStopState |
  ErrorListLocalStopState
);

export type ListLocalStopState = AvailableStates & BaseLocalStopListState;

export const initialListLocalStopState : ListLocalStopState = {
  kind: "InitialListLocalStopState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
