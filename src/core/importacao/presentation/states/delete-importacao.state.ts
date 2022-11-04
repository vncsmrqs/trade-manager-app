export type BaseDeleteImportacaoState = {
  error?: string;
}
export type InitialDeleteImportacaoState = {
  kind: "InitialDeleteImportacaoState";
}

export type DeletingImportacaoState = {
  kind: "DeletingImportacaoState";
}

export type DeletedImportacaoState = {
  kind: "DeletedImportacaoState";
}

export type ErrorDeleteImportacaoState = {
  kind: "ErrorDeleteImportacaoState";
}

export type DeleteImportacaoState = (
  InitialDeleteImportacaoState |
  DeletingImportacaoState |
  DeletedImportacaoState |
  ErrorDeleteImportacaoState
) & BaseDeleteImportacaoState;

export const initialDeleteImportacaoState: DeleteImportacaoState = {
  kind: "InitialDeleteImportacaoState",
  error: undefined,
};
