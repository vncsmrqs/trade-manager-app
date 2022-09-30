import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";

export type BaseDeleteGatilhoState = {
  error?: string;
}
export type InitialDeleteGatilhoState = {
  kind: "InitialDeleteGatilhoState";
}

export type DeletingGatilhoState = {
  kind: "DeletingGatilhoState";
}

export type DeletedGatilhoState = {
  kind: "DeletedGatilhoState";
}

export type ErrorDeleteGatilhoState = {
  kind: "ErrorDeleteGatilhoState";
}

export type DeleteGatilhoState = (
  InitialDeleteGatilhoState |
  DeletingGatilhoState |
  DeletedGatilhoState |
  ErrorDeleteGatilhoState
) & BaseDeleteGatilhoState;

export const initialDeleteGatilhoState: DeleteGatilhoState = {
  kind: "InitialDeleteGatilhoState",
  error: undefined,
};
