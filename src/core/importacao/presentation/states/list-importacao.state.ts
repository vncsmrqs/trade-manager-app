import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";

export type BaseImportacaoListState = {
  search?: string;
  itemsPerPage?: number;
  items: ImportacaoEntity[];
  page: number;
  pageCount: number;
  error?: string;
};

export type InitialListImportacaoState = {
  kind: "InitialListImportacaoState";
}

export type LoadingListImportacaoState = {
  kind: "LoadingListImportacaoState";
}

export type LoadedListImportacaoState = {
  kind: "LoadedListImportacaoState";
}

export type ErrorListImportacaoState = {
  kind: "ErrorListImportacaoState";
  error: string;
}

type AvailableStates = (
  InitialListImportacaoState |
  LoadingListImportacaoState |
  LoadedListImportacaoState |
  ErrorListImportacaoState
);

export type ListImportacaoState = AvailableStates & BaseImportacaoListState;

export const initialListImportacaoState : ListImportacaoState = {
  kind: "InitialListImportacaoState",
  itemsPerPage: 10,
  items: [],
  page: 1,
  pageCount: 0,
};
