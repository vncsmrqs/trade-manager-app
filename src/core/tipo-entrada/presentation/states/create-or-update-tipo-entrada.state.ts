import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export type BaseCreateGatilhoState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateGatilhoState = {
  kind: "InitialCreateOrUpdateGatilhoState";
}

export type SavingGatilhoState = {
  kind: "SavingGatilhoState";
}

export type CreatedOrUpdatedGatilhoState = {
  kind: "CreatedOrUpdatedGatilhoState";
}

export type ErrorSavingGatilhoState = {
  kind: "ErrorSavingGatilhoState";
}

export type CreateOrUpdateTipoEntradaState = (
  InitialCreateGatilhoState |
  SavingGatilhoState |
  CreatedOrUpdatedGatilhoState |
  ErrorSavingGatilhoState
) & BaseCreateGatilhoState;

export const initialCreateGatilhoState: CreateOrUpdateTipoEntradaState = {
  kind: "InitialCreateOrUpdateGatilhoState",
  formDisabled: false,
  error: undefined,
};
