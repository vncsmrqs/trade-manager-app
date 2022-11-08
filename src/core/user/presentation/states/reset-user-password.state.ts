export type BaseResetUserPasswordState = {
  error?: string;
}
export type InitialResetUserPasswordState = {
  kind: "InitialResetUserPasswordState";
}

export type ResettingUserPasswordState = {
  kind: "ResettingUserPasswordState";
}

export type RedefinedUserPasswordState = {
  kind: "RedefinedUserPasswordState";
}

export type ErrorResetUserPasswordState = {
  kind: "ErrorResetUserPasswordState";
}

export type ResetUserPasswordState = (
  InitialResetUserPasswordState |
  ResettingUserPasswordState |
  RedefinedUserPasswordState |
  ErrorResetUserPasswordState
) & BaseResetUserPasswordState;

export const initialResetUserPasswordState: ResetUserPasswordState = {
  kind: "InitialResetUserPasswordState",
  error: undefined,
};
