export type BaseDeleteUserState = {
  error?: string;
}
export type InitialDeleteUserState = {
  kind: "InitialDeleteUserState";
}

export type DeletingUserState = {
  kind: "DeletingUserState";
}

export type DeletedUserState = {
  kind: "DeletedUserState";
}

export type ErrorDeleteUserState = {
  kind: "ErrorDeleteUserState";
}

export type DeleteUserState = (
  InitialDeleteUserState |
  DeletingUserState |
  DeletedUserState |
  ErrorDeleteUserState
) & BaseDeleteUserState;

export const initialDeleteUserState: DeleteUserState = {
  kind: "InitialDeleteUserState",
  error: undefined,
};
