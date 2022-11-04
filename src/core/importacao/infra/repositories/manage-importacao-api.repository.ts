import { ListImportacaoRepositoryContract } from "@/core/importacao/data/contracts/list-importacao.repository";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteImportacaoRepositoryContract } from "@/core/importacao/data/contracts/delete-importacao.repository";
import { HttpClient } from "@/core/common/domain/http-client";
import { UploadFileToImportTradeRepositoryContract } from "@/core/trade/data/contracts/upload-file-to-import-trade.repository";
import { ImportUploadedFileTradeRepositoryContract } from "@/core/trade/data/contracts/import-uploaded-file-trade.repository";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";

type ListImportacaoRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  ativo?: boolean;
};

type ListImportacaoResponse = {
  data: Record<string, any>[];
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number,
  },
};

type UploadFileResponse = {
  path: string;
  total_items: number;
};

type ImportFileRequest = {
  file_path: string;
  filename: string;
};

type ImportFileResponse = {
  total_items: number;
}

const resourcePath = '/trades/importacoes';

export class ManageImportacaoApiRepository extends HttpClient implements
  ListImportacaoRepositoryContract,
  DeleteImportacaoRepositoryContract,
  UploadFileToImportTradeRepositoryContract,
  ImportUploadedFileTradeRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListImportacaoRepositoryContract.Params
  ): Promise<ActionResult<ListImportacaoRepositoryContract.Response, any>> {
    try {
      const requestParams: ListImportacaoRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        ativo: params.ativo,
      };

      const { data, meta } = await this.client.get<ListImportacaoResponse>(resourcePath, {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((importacao) => ImportacaoEntity.createFromRaw(importacao)),
        page: meta.current_page,
        pageCount: meta.last_page,
      });
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteImportacaoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/trades/importacoes/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esta importação');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async uploadFile(
    params: UploadFileToImportTradeRepositoryContract.Params
  ): Promise<ActionResult<UploadFileToImportTradeRepositoryContract.Response, string>> {
    try {
      const formData = new FormData();
      formData.append('file', params.file);

      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function ({ loaded }: AxiosProgressEvent) {
          params.uploadProgressCallback(params.fileSize, loaded);
        },
      };

      const { total_items, path } = await this.client
        .post<UploadFileResponse>(`${resourcePath}/upload-file`, formData, requestConfig);

      return ActionResult.success({
        totalItems: total_items,
        filePath: path,
      });
    }
    catch (error: any) {
      const valueOrDefault = <T = any>(value: T, defaultValue: T) => {
        return value != undefined ? value : defaultValue;
      };
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 400) {
        return ActionResult.failure(
          `${
            valueOrDefault(error.data.message,'Algo inesperado aconteceu durante o upload do arquivo.')
          } ${
            valueOrDefault(error.data.error,'Provalmente é algum problema com sua planilha. Por favor, confira e tente novamente.')
          }`
        );
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async importFile(
    params: ImportUploadedFileTradeRepositoryContract.Params
  ): Promise<ActionResult<ImportUploadedFileTradeRepositoryContract.Response, string>> {
    try {
      const requestBody: ImportFileRequest = {
        file_path: params.filePath,
        filename: params.filename,
      };

      await this.client.post<ImportFileResponse>(`${resourcePath}/import-file`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
