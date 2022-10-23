import { UserEntity } from "@/core/user/domain/entities/user.entity";

export type BaseUserListState = {
  search?: string;
  itemsPerPage?: number;
  items: UserEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListUserState = {
  kind: "InitialListUserState";
}

export type LoadingListUserState = {
  kind: "LoadingListUserState";
}

export type LoadedListUserState = {
  kind: "LoadedListUserState";
}

export type ErrorListUserState = {
  kind: "ErrorListUserState";
  error: string;
}

type AvailableStates = (
  InitialListUserState |
  LoadingListUserState |
  LoadedListUserState |
  ErrorListUserState
);

export type ListUserState = AvailableStates & BaseUserListState;

export const initialListUserState : ListUserState = {
  kind: "InitialListUserState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
