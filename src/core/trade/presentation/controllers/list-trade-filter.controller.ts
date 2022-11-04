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
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";

export class ListTradeFilterController extends Controller<ListTradeFilterState> {
  constructor(
    private listSetupUseCase: ListSetupUseCaseContract,
    private listGatilhoUseCase: ListGatilhoUseCaseContract,
    private listTipoEntradaUseCase: ListTipoEntradaUseCaseContract,
    private listAtivoUseCase: ListAtivoUseCaseContract,
    private listFiltroUseCase: ListCampoCustomizavelUseCaseContract,
    private listTipoStopUseCase: ListTipoStopUseCaseContract,
    private listLocalStopUseCase: ListLocalStopUseCaseContract,
  ) {
    super(initialListTradeFilterState);
  }

  public resetState() {
    this.changeState(initialListTradeFilterState);
  }

  get setupList() {
    return this.state.setupList.items.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get gatilhoList() {
    return this.state.gatilhoList.items.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get tipoEntradaList() {
    return this.state.tipoEntradaList.items.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get tipoStopList() {
    return this.state.tipoStopList.items.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get localStopList() {
    return this.state.localStopList.items.map((item) => ({
      text: item.nome,
      value: item.id,
    }));
  }

  get ativoList() {
    return this.state.ativoList.items.map((item) => ({
      text: item.codigo,
      value: item.id,
    }));
  }

  get filtroList() {
    return this.state.filtroList.items;
  }

  public loadAllFilterList() {
    this.changeState({ kind: "LoadingListTradeFilterState" });
    Promise.all([
        this.loadSetupList(),
        this.loadGatilhoList(),
        this.loadTipoEntradaList(),
        this.loadAtivoList(),
        this.loadFiltroList(),
        this.loadTipoStopList(),
        this.loadLocalStopList(),
    ]).then(() => {
      this.changeState({ kind: 'LoadedListTradeFilterState' });
    });
  }

  public async loadAtivoList() {
    this.changeState({
      ativoList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listAtivoUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          ativoList: {
            ...this.state.ativoList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        ativoList: {
          ...this.state.ativoList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        ativoList: {
          ...this.state.ativoList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadSetupList() {
    this.changeState({
      setupList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listSetupUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          setupList: {
            ...this.state.setupList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        setupList: {
          ...this.state.setupList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        setupList: {
          ...this.state.setupList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadGatilhoList() {
    this.changeState({
      gatilhoList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listGatilhoUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          gatilhoList: {
            ...this.state.gatilhoList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        gatilhoList: {
          ...this.state.gatilhoList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        gatilhoList: {
          ...this.state.gatilhoList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadTipoEntradaList() {
    this.changeState({
      tipoEntradaList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listTipoEntradaUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          tipoEntradaList: {
            ...this.state.tipoEntradaList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        tipoEntradaList: {
          ...this.state.tipoEntradaList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        tipoEntradaList: {
          ...this.state.tipoEntradaList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadTipoStopList() {
    this.changeState({
      tipoStopList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listTipoStopUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          tipoStopList: {
            ...this.state.tipoStopList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        tipoStopList: {
          ...this.state.tipoStopList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        tipoStopList: {
          ...this.state.tipoStopList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadLocalStopList() {
    this.changeState({
      localStopList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listLocalStopUseCase.execute({ ativo: true });

      if (result.successful) {
        this.changeState({
          localStopList: {
            ...this.state.localStopList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        localStopList: {
          ...this.state.localStopList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        localStopList: {
          ...this.state.localStopList,
          error: error.message,
          loading: false,
        },
      });
    }
  }

  public async loadFiltroList() {
    this.changeState({
      filtroList: {
        items: [],
        loading: true,
        error: undefined,
      },
    });
    try {
      const result = await this.listFiltroUseCase.execute({ ativo: true, contexto: 'filtro' });

      if (result.successful) {
        this.changeState({
          filtroList: {
            ...this.state.filtroList,
            items: result.value.items,
            loading: false,
          },
        });
        return;
      }

      this.changeState({
        filtroList: {
          ...this.state.filtroList,
          error: result.error,
          loading: false,
        },
      });
    }
    catch (error: any) {
      this.changeState({
        filtroList: {
          ...this.state.filtroList,
          error: error.message,
          loading: false,
        },
      });
    }
  }
}
