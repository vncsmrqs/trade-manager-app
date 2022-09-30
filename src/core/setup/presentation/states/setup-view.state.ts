import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseSetupListState = {
  itemsPerPage: number;
  items: SetupEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialSetupViewState = {
  kind: "InitialSetupViewState";
}

export type LoadingSetupViewState = {
  kind: "LoadingSetupViewState";
}

export type LoadedSetupViewState = {
  kind: "LoadedSetupViewState";
  items: SetupEntity[];
  page: number;
  pageCount: number;
}

export type ErrorSetupViewState = {
  kind: "ErrorSetupViewState";
  error: string;
}

type AvailableStates = (
  InitialSetupViewState |
  LoadingSetupViewState |
  LoadedSetupViewState |
  ErrorSetupViewState
);

export type SetupViewState = AvailableStates & BaseSetupListState;

export const initialSetupViewState : SetupViewState = {
  kind: "InitialSetupViewState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
