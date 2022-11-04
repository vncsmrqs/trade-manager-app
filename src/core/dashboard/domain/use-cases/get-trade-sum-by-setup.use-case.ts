import { ActionResult } from "@/core/common/domain/action-result";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";

export interface GetTradeSumBySetupUseCaseContract {
  execute(
    params: GetTradeSumBySetupUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupUseCaseContract.Response, string>>
}

export namespace GetTradeSumBySetupUseCaseContract {
  export type Params = {
    startDate: string;
    endDate: string;
    ativoId?: string;
  };
  export type Response = {
    items: TradeSumBySetupItem[];
  };
}

export type TradeSumBySetupItem = {
  position: number,
  setupNome: string,
  items: ResultadoTradeValue[],
}

