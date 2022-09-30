import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseCreateSetupState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateSetupState = {
  kind: "InitialCreateOrUpdateSetupState";
}

export type SavingSetupState = {
  kind: "SavingSetupState";
}

export type CreatedOrUpdatedSetupState = {
  kind: "CreatedOrUpdatedSetupState";
}

export type ErrorSavingSetupState = {
  kind: "ErrorSavingSetupState";
}

export type CreateOrUpdateSetupState = (
  InitialCreateSetupState |
  SavingSetupState |
  CreatedOrUpdatedSetupState |
  ErrorSavingSetupState
) & BaseCreateSetupState;

export const initialCreateSetupState: CreateOrUpdateSetupState = {
  kind: "InitialCreateOrUpdateSetupState",
  formDisabled: false,
  error: undefined,
};
