import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type InitialCreateSetupState = {
  kind: "InitialCreateSetupState";
}

export type SavingSetupState = {
  kind: "SavingSetupState";
  formDisabled: boolean;
}

export type CreatedSetupState = {
  kind: "CreatedSetupState";
  setupCreated: SetupEntity;
}

export type ErrorCreateSetupState = {
  kind: "ErrorCreateSetupState";
  error: string;
}

export type CreateSetupState = (
  InitialCreateSetupState |
  SavingSetupState |
  CreatedSetupState |
  ErrorCreateSetupState
);

export const initialCreateSetupState: CreateSetupState = {
  kind: "InitialCreateSetupState",
};
