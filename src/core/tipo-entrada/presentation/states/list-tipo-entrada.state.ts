import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";

export type BaseTipoEntradaListState = {
  search?: string;
  itemsPerPage?: number;
  items: TipoEntradaEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListTipoEntradaState = {
  kind: "InitialListTipoEntradaState";
}

export type LoadingListTipoEntradaState = {
  kind: "LoadingListTipoEntradaState";
}

export type LoadedListTipoEntradaState = {
  kind: "LoadedListTipoEntradaState";
}

export type ErrorListTipoEntradaState = {
  kind: "ErrorListTipoEntradaState";
  error: string;
}

type AvailableStates = (
  InitialListTipoEntradaState |
  LoadingListTipoEntradaState |
  LoadedListTipoEntradaState |
  ErrorListTipoEntradaState
);

export type ListTipoEntradaState = AvailableStates & BaseTipoEntradaListState;

export const initialListTipoEntradaState : ListTipoEntradaState = {
  kind: "InitialListTipoEntradaState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
