import { UserEntity } from "@/core/user/domain/entities/user.entity";

export type BaseCreateUserState = {
  formDisabled: boolean;
  error?: string;
}

export type InitialCreateUserState = {
  kind: "InitialCreateOrUpdateUserState";
}

export type SavingUserState = {
  kind: "SavingUserState";
}

export type CreatedOrUpdatedUserState = {
  kind: "CreatedOrUpdatedUserState";
}

export type ErrorSavingUserState = {
  kind: "ErrorSavingUserState";
}

export type CreateOrUpdateUserState = (
  InitialCreateUserState |
  SavingUserState |
  CreatedOrUpdatedUserState |
  ErrorSavingUserState
) & BaseCreateUserState;

export const initialCreateUserState: CreateOrUpdateUserState = {
  kind: "InitialCreateOrUpdateUserState",
  formDisabled: false,
  error: undefined,
};
