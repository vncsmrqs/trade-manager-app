import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export type BaseDeleteSetupState = {
  error?: string;
}
export type InitialDeleteSetupState = {
  kind: "InitialDeleteSetupState";
}

export type DeletingSetupState = {
  kind: "DeletingSetupState";
}

export type DeletedSetupState = {
  kind: "DeletedSetupState";
}

export type ErrorDeleteSetupState = {
  kind: "ErrorDeleteSetupState";
}

export type DeleteSetupState = (
  InitialDeleteSetupState |
  DeletingSetupState |
  DeletedSetupState |
  ErrorDeleteSetupState
) & BaseDeleteSetupState;

export const initialDeleteSetupState: DeleteSetupState = {
  kind: "InitialDeleteSetupState",
  error: undefined,
};
