import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export type BaseCreateLocalStopState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateLocalStopState = {
  kind: "InitialCreateOrUpdateLocalStopState";
}

export type SavingLocalStopState = {
  kind: "SavingLocalStopState";
}

export type CreatedOrUpdatedLocalStopState = {
  kind: "CreatedOrUpdatedLocalStopState";
}

export type ErrorSavingLocalStopState = {
  kind: "ErrorSavingLocalStopState";
}

export type CreateOrUpdateLocalStopState = (
  InitialCreateLocalStopState |
  SavingLocalStopState |
  CreatedOrUpdatedLocalStopState |
  ErrorSavingLocalStopState
) & BaseCreateLocalStopState;

export const initialCreateLocalStopState: CreateOrUpdateLocalStopState = {
  kind: "InitialCreateOrUpdateLocalStopState",
  formDisabled: false,
  error: undefined,
};
