import {
  UploadFileToImportTradeUseCaseContract,
} from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";

export type BaseImportFileTradeState = {
  error?: string;
  fileName: string;
  fileSize: number;
  file?: File | null;
  uploadProgress: number;
  filePath?: string;
  totalItems?: number;
  filesTypesAcceptable: string[];
}

export type InitialImportFileTradeState = {
  kind: "InitialImportFileTradeState";
}

export type UploadingImportFileTradeState = {
  kind: "UploadingImportFileTradeState";
  file: File;
}

export type SavingImportFileTradeState = {
  kind: "SavingImportFileTradeState";
}

export type UploadedImportFiledTradeState = {
  kind: "UploadedImportFiledTradeState";
  totalItems: number;
  filePath: string;
}

export type SavedImportFileTradeState = {
  kind: "SavedImportFileTradeState";
}

export type ErrorImportFileTradeState = {
  kind: "ErrorImportFileTradeState";
}

export type ImportFileTradeState = (
  InitialImportFileTradeState |
  UploadingImportFileTradeState |
  UploadedImportFiledTradeState |
  SavingImportFileTradeState |
  SavedImportFileTradeState |
  ErrorImportFileTradeState
) & BaseImportFileTradeState;

export const initialImportFileTradeState: ImportFileTradeState = {
  kind: "InitialImportFileTradeState",
  error: undefined,
  fileName: '',
  fileSize: 0,
  file: null,
  uploadProgress: 0,
  filesTypesAcceptable: [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
  ],
};
