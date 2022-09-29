export type User = {
  id: string
  name: string;
  initials: string;
  lastname: string;
  email: string;
};

export type BaseAuthState = {
  user?: User;
}

export type InitialAuthState = {
  kind: "InitialAuthState";
}

export type LoggedInAuthState = {
  kind: "LoggedInAuthState";
  user: User;
}

export type AuthState = (LoggedInAuthState | InitialAuthState) & BaseAuthState;

export const initialAuthState: AuthState = {
  kind: "InitialAuthState",
};
