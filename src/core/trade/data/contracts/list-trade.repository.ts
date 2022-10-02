import { ActionResult } from "@/core/common/domain/action-result";
import { TradeEntity, TradeResultadoType } from "@/core/trade/domain/entities/trade.entity";

export interface ListTradeRepositoryContract {
  list(
    params: ListTradeRepositoryContract.Params
  ): Promise<ActionResult<ListTradeRepositoryContract.Response, string>>
}

export namespace ListTradeRepositoryContract {
  export type Params = {
    //filter
    setupId?: string[];
    ativoId?: string[];
    tipoEntradaId?: string[];
    gatilhoId?: string[];
    resultado?: TradeResultadoType[];

    startDate: string;
    endDate: string;

    //pagination
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: TradeEntity[];
    page: number;
    pageCount: number;
    metadata: {
      totalItems: number,
      lossCount: number,
      gainCount: number,
      lossPercentage: number,
      gainPercentage: number,
    },
  }
}