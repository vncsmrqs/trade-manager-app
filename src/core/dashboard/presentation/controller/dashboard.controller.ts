import { Controller } from "@/core/common/domain/controller";
import {
  DashboardSearchParams,
  DashboardState,
  initialDashboardState,
} from "@/core/dashboard/presentation/state/dashboard.state";
import { GetTradeSumBySetupUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { GetTradeSumByWeekdayUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { GetTradeSumUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { GetTradeSumByIntervalUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";

export class DashboardController extends Controller<DashboardState> {
  constructor(
    private getTradeSumBySetupUseCase: GetTradeSumBySetupUseCaseContract,
    private getTradeSumByWeekdayUseCase: GetTradeSumByWeekdayUseCaseContract,
    private getTradeSumUseCase: GetTradeSumUseCaseContract,
    private getTradeSumByIntervalUseCase: GetTradeSumByIntervalUseCaseContract,
  ) {
    super(initialDashboardState);
  }

  public async search(params: DashboardSearchParams) {
    this.changeState({
      kind: "LoadingDashboardState",
      searchParams: params,
    });
    try {
      await Promise.all([
        this.getRankingOfSetup(params),
        this.getTradeSumByWeekday(params),
        this.getTradeSum(params),
        this.getMorningTradeSum(params),
        this.getEveningTradeSum(params),
        this.getTradeSumByInterval(params),
      ]);
      this.changeState({
        kind: "LoadedDashboardState",
        error: undefined,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDashboardState",
        error: 'Algo inesperado ocorreu ao atualizar o dashboard.',

      });
    }
  }

  private async getRankingOfSetup(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateRankingOfSetupState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumBySetupUseCase.execute(params);

      if (result.successful) {
        this.updateRankingOfSetupState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateRankingOfSetupState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateRankingOfSetupState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar o ranking de setups.',
      });
    }
  }

  private updateRankingOfSetupState(state: any): void {
    this.changeState({
      rankingOfSetups: {
        ...this.state.rankingOfSetups,
        ...state,
      },
    });
  }

  private async getTradeSumByWeekday(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateTradesByWeekdayState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumByWeekdayUseCase.execute(params);

      if (result.successful) {
        this.updateTradesByWeekdayState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateTradesByWeekdayState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateTradesByWeekdayState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar os registros pelos dias da semana.',
      });
    }
  }

  private updateTradesByWeekdayState(state: any): void {
    this.changeState({
      tradesByWeekday: {
        ...this.state.tradesByWeekday,
        ...state,
      },
    });
  }

  private async getTradeSum(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateTotalTradesState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumUseCase.execute(params);

      if (result.successful) {
        this.updateTotalTradesState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateTotalTradesState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateTotalTradesState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar a soma dos registros.',
      });
    }
  }

  private updateTotalTradesState(state: any): void {
    this.changeState({
      totalTrades: {
        ...this.state.totalTrades,
        ...state,
      },
    });
  }

  private async getMorningTradeSum(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateMorningTradesState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumUseCase.execute({
        ...params,
        startTime: '09:00:00',
        endTime: '12:00:00',
      });

      if (result.successful) {
        this.updateMorningTradesState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateMorningTradesState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateMorningTradesState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar os registros da manhã.',
      });
    }
  }

  private updateMorningTradesState(state: any): void {
    this.changeState({
      morningTrades: {
        ...this.state.morningTrades,
        ...state,
      },
    });
  }

  private async getEveningTradeSum(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateEveningTradesState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumUseCase.execute({
        ...params,
        startTime: '12:00:00',
        endTime: '18:00:00',
      });

      if (result.successful) {
        this.updateEveningTradesState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateEveningTradesState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateEveningTradesState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar os registros da tarde.',
      });
    }
  }

  private updateEveningTradesState(state: any): void {
    this.changeState({
      eveningTrades: {
        ...this.state.eveningTrades,
        ...state,
      },
    });
  }

  private async getTradeSumByInterval(params: DashboardSearchParams): Promise<void> {
    try {
      this.updateTradesByIntervalState({
        loading: true,
        error: undefined,
      });

      const result = await this.getTradeSumByIntervalUseCase.execute(params);

      if (result.successful) {
        this.updateTradesByIntervalState({
          loading: false,
          items: result.value.items,
          error: undefined,
        });
        return;
      }
      this.updateTradesByIntervalState({
        loading: false,
        items: [],
        error: result.error,
      });
    } catch (error: any) {
      this.updateTradesByIntervalState({
        loading: false,
        items: [],
        error: 'Algo inesperado aconteceu ao buscar os registros por intervalo.',
      });
    }
  }

  private updateTradesByIntervalState(state: any): void {
    this.changeState({
      tradesByInterval: {
        ...this.state.tradesByInterval,
        ...state,
      },
    });
  }

  resetState() {
    this.changeState(initialDashboardState);
  }
}
