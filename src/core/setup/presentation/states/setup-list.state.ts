import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseSetupListState = {
  ready: boolean;
};

export type LoadingSetupListState = {
  kind: "LoadingSetupListState";
}

export type UpdatedSetupListState = {
  kind: "UpdatedSetupListState";
  items: SetupEntity[];
  page: number;
}

export type ErrorSetupListState = {
  kind: "ErrorSetupListState";
  error: string;
}

export type SetupListState = (
  LoadingSetupListState |
  UpdatedSetupListState |
  ErrorSetupListState
) & BaseSetupListState;

export const initialState: SetupListState = {
  kind: "LoadingSetupListState",
  ready: false,
};
