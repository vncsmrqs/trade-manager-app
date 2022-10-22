import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export type BaseCreateTipoStopState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateTipoStopState = {
  kind: "InitialCreateOrUpdateTipoStopState";
}

export type SavingTipoStopState = {
  kind: "SavingTipoStopState";
}

export type CreatedOrUpdatedTipoStopState = {
  kind: "CreatedOrUpdatedTipoStopState";
}

export type ErrorSavingTipoStopState = {
  kind: "ErrorSavingTipoStopState";
}

export type CreateOrUpdateTipoStopState = (
  InitialCreateTipoStopState |
  SavingTipoStopState |
  CreatedOrUpdatedTipoStopState |
  ErrorSavingTipoStopState
) & BaseCreateTipoStopState;

export const initialCreateTipoStopState: CreateOrUpdateTipoStopState = {
  kind: "InitialCreateOrUpdateTipoStopState",
  formDisabled: false,
  error: undefined,
};
