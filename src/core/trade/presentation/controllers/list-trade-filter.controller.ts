import { Controller } from "@/core/common/domain/controller";
import {
  initialListTradeFilterState,
  ListTradeFilterState
} from "@/core/trade/presentation/states/list-trade-filter.state";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";
import { ListAtivoUseCaseContract } from "@/core/ativo/domain/use-cases/list-ativo.use-case";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import { ActionResult } from "@/core/common/domain/action-result";

export class ListTradeFilterController extends Controller<ListTradeFilterState> {
  constructor(
    private listSetupUseCase: ListSetupUseCaseContract,
    private listGatilhoUseCase: ListGatilhoUseCaseContract,
    private listTipoEntradaUseCase: ListTipoEntradaUseCaseContract,
    private listAtivoUseCase: ListAtivoUseCaseContract,
    private listFiltroUseCase: ListCampoCustomizavelUseCaseContract,
  ) {
    super(initialListTradeFilterState);
  }

  public resetState() {
    this.changeState(initialListTradeFilterState);
  }

  public async loadFilterList() {
    this.changeState({ kind: "LoadingListTradeFilterState" });
    try {
      const [
        setupResult,
        gatilhoResult,
        tipoEntradaResult,
        ativoResult,
        filtroResult,
      ] = await Promise.all([
        this.listSetupUseCase.execute({}),
        this.listGatilhoUseCase.execute({}),
        this.listTipoEntradaUseCase.execute({}),
        this.listAtivoUseCase.execute({}),
        this.listFiltroUseCase.execute({}),
      ]);

      const mainResult = ActionResult.combine([
        setupResult,
        gatilhoResult,
        tipoEntradaResult,
        ativoResult,
        filtroResult,
      ]);

      if (mainResult.successful) {
        this.changeState({
          kind: 'LoadedListTradeFilterState',
          setupList: setupResult.value.items,
          gatilhoList: gatilhoResult.value.items,
          tipoEntradaList: tipoEntradaResult.value.items,
          ativoList: ativoResult.value.items,
          filtroList: filtroResult.value.items,
        });

        return;
      }

      this.changeState({
        kind: 'ErrorListTradeFilterState',
        error: mainResult.error,
      });
    }
    catch (error: any) {
      this.changeState({
        kind: 'ErrorListTradeFilterState',
        error: error.message,
      });
    }
  }
}
