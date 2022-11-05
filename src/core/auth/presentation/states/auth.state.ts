import { UserEntity } from "@/core/auth/domain/entities/user.entity";

export type BaseAuthState = {
  token?: string;
  user?: UserEntity;
  error?: string;
  getCurrentUserLoader?: Promise<void>;

  changePassword: {
    loading: boolean;
    error?: string;
  }
}

export type InitialAuthState = {
  kind: "InitialAuthState";
}

export type LoadingAuthState = {
  kind: "LoadingAuthState";
}

export type LoggedInAuthState = {
  kind: "LoggedInAuthState";
  user: UserEntity;
}

export type ErrorAuthState = {
  kind: "ErrorAuthState";
  error: string;
}


export type AuthState = (
  LoggedInAuthState |
  InitialAuthState |
  LoadingAuthState |
  ErrorAuthState
) & BaseAuthState;

export const initialAuthState: AuthState = {
  kind: "InitialAuthState",
  user: undefined,
  token: undefined,
  error: undefined,
  changePassword: {
    loading: false,
    error: undefined,
  }
};
