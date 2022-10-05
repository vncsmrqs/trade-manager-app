import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseSetupListState = {
  search?: string;
  itemsPerPage?: number;
  items: SetupEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListSetupState = {
  kind: "InitialListSetupState";
}

export type LoadingListSetupState = {
  kind: "LoadingListSetupState";
}

export type LoadedListSetupState = {
  kind: "LoadedListSetupState";
}

export type ErrorListSetupState = {
  kind: "ErrorListSetupState";
  error: string;
}

type AvailableStates = (
  InitialListSetupState |
  LoadingListSetupState |
  LoadedListSetupState |
  ErrorListSetupState
);

export type ListSetupState = AvailableStates & BaseSetupListState;

export const initialListSetupState : ListSetupState = {
  kind: "InitialListSetupState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
