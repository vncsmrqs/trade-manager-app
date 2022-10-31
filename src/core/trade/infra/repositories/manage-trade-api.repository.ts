import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { TradeEntity, TradeResultadoType, TradeSentimentoType } from "@/core/trade/domain/entities/trade.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { UploadFileToImportTradeRepositoryContract } from "@/core/trade/data/contracts/upload-file-to-import-trade.repository";
import { ImportUploadedFileTradeRepositoryContract } from "@/core/trade/data/contracts/import-uploaded-file-trade.repository";
import { UploadTradeImageRepositoryContract } from "@/core/trade/data/contracts/upload-image-trade.repository";
import { HttpClient } from "@/core/common/domain/http-client";
import { AxiosProgressEvent, AxiosRequestConfig } from "axios";

type ListTradeRequest = {
  setup_id?: string;
  gatilho_id?: string;
  tipo_entrada_id?: string;
  ativo_id?: string;
  tipo_stop_id?: string;
  local_stop_id?: string;
  resultado?: string;

  start_date: string;
  end_date: string;

  page?: number;
  items_per_page?: number;
}

type ListTradeResponse = {
  data: Record<string, any>[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    gain_count?: number;
    gain_percentage?: number;
    loss_count?: number;
    loss_percentage?: number;
    draw_count?: number;
    draw_percentage?: number;
  };
}

type CreateTradeRequest = {
  setup_id?: string,
  gatilho_id?: string,
  tipo_entrada_id?: string,
  ativo_id: string,
  tipo_stop_id?: string,
  local_stop_id?: string,
  valor_resultado: number,
  lote: number,
  resultado?: TradeResultadoType,
  pontuacao: number,
  data_trade: string,
  hora_trade: string,
  seguiu_plano?: boolean,
  primeiro_alvo?: boolean,
  segundo_alvo?: boolean,
  sentimento?: TradeSentimentoType,
  imagem_path?: string,
  observacao?: string,
  filtros?: Record<string, string>,
};

type CreateTradeResponse = {};

type UpdateTradeRequest = {
  setup_id?: string,
  gatilho_id?: string,
  tipo_entrada_id?: string,
  ativo_id?: string,
  tipo_stop_id?: string,
  local_stop_id?: string,
  valor_resultado?: number,
  lote?: number,
  resultado?: TradeResultadoType,
  pontuacao?: number,
  data_trade?: string,
  hora_trade?: string,
  seguiu_plano?: boolean,
  primeiro_alvo?: boolean,
  segundo_alvo?: boolean,
  sentimento?: TradeSentimentoType,
  imagem_path?: string,
  filtros?: Record<string, string>,
  observacao?: string,
};

type UpdateTradeResponse = {};

type UploadFileResponse = {
  path: string;
  total_items: number;
};

type UploadImageResponse = {
  path: string;
  url: string;
}

type ImportFileRequest = {
  file_path: string;
  filename: string;
};

type ImportFileResponse = {
  total_items: number;
}

export class ManageTradeApiRepository extends HttpClient implements
  ListTradeRepositoryContract,
  CreateTradeRepositoryContract,
  UpdateTradeRepositoryContract,
  DeleteTradeRepositoryContract,
  UploadFileToImportTradeRepositoryContract,
  ImportUploadedFileTradeRepositoryContract,
  UploadTradeImageRepositoryContract
{
  constructor(baseURL: string) {
    super(baseURL);
  }
  async list(
    params: ListTradeRepositoryContract.Params
  ): Promise<ActionResult<ListTradeRepositoryContract.Response, any>> {
    try {
      const requestParams: ListTradeRequest = {
        page: params.page,
        items_per_page: params.itemsPerPage,
        setup_id: params.setupId?.[0],
        gatilho_id: params.gatilhoId?.[0],
        tipo_entrada_id: params.tipoEntradaId?.[0],
        ativo_id: params.ativoId?.[0],
        tipo_stop_id: params.tipoStopId?.[0],
        local_stop_id: params.localStopId?.[0],
        resultado: params.resultado?.[0],
        start_date: params.startDate,
        end_date: params.endDate,
      };

      const { data, meta } = await this.client.get<ListTradeResponse>('/trades', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((trade) => TradeEntity.createFromRaw(trade)),
        page: meta.current_page,
        pageCount: meta.last_page,
        metadata: {
          totalItems: meta.total,
          lossCount: meta.loss_count || 0,
          gainCount: meta.gain_count || 0,
          drawCount: meta.draw_count || 0,
          lossPercentage: meta.loss_percentage || 0,
          gainPercentage: meta.gain_percentage || 0,
          drawPercentage: meta.draw_percentage || 0,
        }
      });
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async create(params: CreateTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateTradeRequest = {
          setup_id: params.setupId,
          gatilho_id: params.gatilhoId,
          tipo_entrada_id: params.tipoEntradaId,
          ativo_id: params.ativoId,
          tipo_stop_id: params.tipoStopId,
          local_stop_id: params.localStopId,
          valor_resultado: params.valorResultado,
          lote: params.lote,
          resultado: params.resultado,
          pontuacao: params.pontuacao,
          data_trade: params.dataTrade,
          hora_trade: params.horaTrade,
          seguiu_plano: params.seguiuPlano,
          primeiro_alvo: params.primeiroAlvo,
          segundo_alvo: params.segundoAlvo,
          sentimento: params.sentimento,
          imagem_path: params.imagemPath,
          observacao: params.observacao,
          filtros: params.filtros,
      };

      await this.client.post<CreateTradeResponse>('/trades', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 422) {
        return ActionResult.failure('Há algum erro no seu formlário. Confira e tente novamente, por favor.');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateTradeRequest = {
        setup_id: params.setupId,
        gatilho_id: params.gatilhoId,
        tipo_entrada_id: params.tipoEntradaId,
        ativo_id: params.ativoId,
        tipo_stop_id: params.tipoStopId,
        local_stop_id: params.localStopId,
        valor_resultado: params.valorResultado,
        lote: params.lote,
        resultado: params.resultado,
        pontuacao: params.pontuacao,
        data_trade: params.dataTrade,
        hora_trade: params.horaTrade,
        seguiu_plano: params.seguiuPlano,
        primeiro_alvo: params.primeiroAlvo,
        segundo_alvo: params.segundoAlvo,
        sentimento: params.sentimento,
        imagem_path: params.imagemPath,
        observacao: params.observacao,
        filtros: params.filtros,
      };

      await this.client.put<UpdateTradeResponse>(`/trades/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para atualizar este registro');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteTradeRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/trades/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir este registro');
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
        .post<UploadFileResponse>('/trades/upload-file', formData, requestConfig);

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

      await this.client.post<ImportFileResponse>('/trades/import-file', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async uploadImage(
    params: UploadTradeImageRepositoryContract.Params
  ): Promise<ActionResult<UploadTradeImageRepositoryContract.Response, string>> {
    try {
      const formData = new FormData();
      formData.append('image', params.image);

      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function ({ loaded }: AxiosProgressEvent) {
          if (params.uploadProgressCallback) {
            params.uploadProgressCallback(params.fileSize, loaded);
          }
        },
      };

      const { path, url } = await this.client
        .post<UploadImageResponse>('/trades/upload-image', formData, requestConfig);

      return ActionResult.success({
        filePath: path,
        imageUrl: url,
      });
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
