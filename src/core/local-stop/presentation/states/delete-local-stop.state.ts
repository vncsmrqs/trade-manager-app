import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export type BaseDeleteLocalStopState = {
  error?: string;
}
export type InitialDeleteLocalStopState = {
  kind: "InitialDeleteLocalStopState";
}

export type DeletingLocalStopState = {
  kind: "DeletingLocalStopState";
}

export type DeletedLocalStopState = {
  kind: "DeletedLocalStopState";
}

export type ErrorDeleteLocalStopState = {
  kind: "ErrorDeleteLocalStopState";
}

export type DeleteLocalStopState = (
  InitialDeleteLocalStopState |
  DeletingLocalStopState |
  DeletedLocalStopState |
  ErrorDeleteLocalStopState
) & BaseDeleteLocalStopState;

export const initialDeleteLocalStopState: DeleteLocalStopState = {
  kind: "InitialDeleteLocalStopState",
  error: undefined,
};
