import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";
import { GetTradeSumByIntervalRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-interval.repository";
import { GetTradeSumBySetupRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-setup.respository";
import { GetTradeSumByWeekdayRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-weekday.respository";
import { ActionResult } from "@/core/common/domain/action-result";
import { ResultadoTradeValue } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { IntervalTradesItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { TradeSumBySetupItem } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { TradesByWeekdayItemType } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";

import { HttpClient } from "@/core/common/domain/http-client";

type GetTradeSumResponse = {
  result: ResultadoTradeValue[],
}

type GetTradeSumBySetupResponse = {
  result: TradeSumBySetupItem[],
}

type GetTradeSumByWeekdayResponse = {
  result: TradesByWeekdayItemType[],
}

type GetTradeSumByIntervalResponse = {
  result: IntervalTradesItemType[],
}

export class DashboardApiRepository extends HttpClient implements
  GetTradeSumRepositoryContract,
  GetTradeSumByIntervalRepositoryContract,
  GetTradeSumBySetupRepositoryContract,
  GetTradeSumByWeekdayRepositoryContract
{
  constructor(baseURL: string) {
    super(baseURL);
  }

  async getTradeSum(
    params: GetTradeSumRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumRepositoryContract.Response, string>> {
    try {
      const { result: items } = await this.client.get<GetTradeSumResponse>('/dashboard/trade-sum', {
        params: {
          start_date: params.startDate,
          end_date: params.endDate,
          start_time: params.startTime,
          end_time: params.endTime,
          ativo_id: params.ativoId,
        },
      });
      return ActionResult.success({ items });
    } catch (error: any) {
      return ActionResult.failure(error.message);
    }
  }

  async getTradeSumBySetup(
    params: GetTradeSumBySetupRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupRepositoryContract.Response, string>> {
    try {
      const { result: items } = await this.client.get<GetTradeSumBySetupResponse>('/dashboard/trade-sum-by-setup', {
        params: {
          start_date: params.startDate,
          end_date: params.endDate,
          ativo_id: params.ativoId,
        },
      });
      return ActionResult.success({ items });
    } catch (error: any) {
      return ActionResult.failure(error.message);
    }
  }

  async getTradeSumByWeekday(
    params: GetTradeSumByWeekdayRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByWeekdayRepositoryContract.Response, string>> {
    try {
      const { result: items } = await this.client.get<GetTradeSumByWeekdayResponse>('/dashboard/trade-sum-by-weekday', {
        params: {
          start_date: params.startDate,
          end_date: params.endDate,
          ativo_id: params.ativoId,
        },
      });
      return ActionResult.success({ items });
    } catch (error: any) {
      return ActionResult.failure(error.message);
    }
  }

  async getTradeSumByInterval(
    params: GetTradeSumByIntervalRepositoryContract.Params
  ): Promise<ActionResult<GetTradeSumByIntervalRepositoryContract.Response, string>> {
    try {
      const { result: items } = await this.client.get<GetTradeSumByIntervalResponse>('/dashboard/trade-sum-by-interval', {
        params: {
          start_date: params.startDate,
          end_date: params.endDate,
          ativo_id: params.ativoId,
        },
      });
      return ActionResult.success({ items });
    } catch (error: any) {
      return ActionResult.failure(error.message);
    }
  }
}
