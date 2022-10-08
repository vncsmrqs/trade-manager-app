export type User = {
  id: string
  name: string;
  initials: string;
  lastname: string;
  email: string;
  imageUrl?: string;
};

export type BaseAuthState = {
  token?: string;
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
  user: undefined,
  token: undefined,
};
