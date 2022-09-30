import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export type BaseDeleteTipoEntradaState = {
  error?: string;
}
export type InitialDeleteTipoEntradaState = {
  kind: "InitialDeleteTipoEntradaState";
}

export type DeletingTipoEntradaState = {
  kind: "DeletingTipoEntradaState";
}

export type DeletedTipoEntradaState = {
  kind: "DeletedTipoEntradaState";
}

export type ErrorDeleteTipoEntradaState = {
  kind: "ErrorDeleteTipoEntradaState";
}

export type DeleteTipoEntradaState = (
  InitialDeleteTipoEntradaState |
  DeletingTipoEntradaState |
  DeletedTipoEntradaState |
  ErrorDeleteTipoEntradaState
) & BaseDeleteTipoEntradaState;

export const initialDeleteTipoEntradaState: DeleteTipoEntradaState = {
  kind: "InitialDeleteTipoEntradaState",
  error: undefined,
};
