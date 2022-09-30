import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export type BaseCreateTipoEntradaState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateTipoEntradaState = {
  kind: "InitialCreateOrUpdateTipoEntradaState";
}

export type SavingTipoEntradaState = {
  kind: "SavingTipoEntradaState";
}

export type CreatedOrUpdatedTipoEntradaState = {
  kind: "CreatedOrUpdatedTipoEntradaState";
}

export type ErrorSavingTipoEntradaState = {
  kind: "ErrorSavingTipoEntradaState";
}

export type CreateOrUpdateTipoEntradaState = (
  InitialCreateTipoEntradaState |
  SavingTipoEntradaState |
  CreatedOrUpdatedTipoEntradaState |
  ErrorSavingTipoEntradaState
) & BaseCreateTipoEntradaState;

export const initialCreateTipoEntradaState: CreateOrUpdateTipoEntradaState = {
  kind: "InitialCreateOrUpdateTipoEntradaState",
  formDisabled: false,
  error: undefined,
};
