import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export type BaseDeleteTipoStopState = {
  error?: string;
}
export type InitialDeleteTipoStopState = {
  kind: "InitialDeleteTipoStopState";
}

export type DeletingTipoStopState = {
  kind: "DeletingTipoStopState";
}

export type DeletedTipoStopState = {
  kind: "DeletedTipoStopState";
}

export type ErrorDeleteTipoStopState = {
  kind: "ErrorDeleteTipoStopState";
}

export type DeleteTipoStopState = (
  InitialDeleteTipoStopState |
  DeletingTipoStopState |
  DeletedTipoStopState |
  ErrorDeleteTipoStopState
) & BaseDeleteTipoStopState;

export const initialDeleteTipoStopState: DeleteTipoStopState = {
  kind: "InitialDeleteTipoStopState",
  error: undefined,
};
