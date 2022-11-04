import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

type ItemListType<T> = {
  items: T[];
  error?: string;
  loading: boolean;
}

export type BaseListTradeFilterState = {
  setupList: ItemListType<SetupEntity>;
  gatilhoList: ItemListType<GatilhoEntity>;
  tipoEntradaList: ItemListType<TipoEntradaEntity>;
  ativoList: ItemListType<AtivoEntity>;
  tipoStopList: ItemListType<TipoStopEntity>,
  localStopList: ItemListType<LocalStopEntity>,
  filtroList: ItemListType<CampoCustomizavelEntity>;
  error?: string;
}

export type InitialListTradeFilterState = {
  kind: "InitialListTradeFilterState";
}

export type LoadingListTradeFilterState = {
  kind: "LoadingListTradeFilterState";
}

export type LoadedListTradeFilterState = {
  kind: "LoadedListTradeFilterState";
}

export type ErrorListTradeFilterState = {
  kind: "ErrorListTradeFilterState";
  error: string;
}

export type ListTradeFilterState = (
  InitialListTradeFilterState |
  LoadingListTradeFilterState |
  LoadedListTradeFilterState |
  ErrorListTradeFilterState
) & BaseListTradeFilterState;

export const initialListTradeFilterState: ListTradeFilterState = {
  kind: "InitialListTradeFilterState",
  setupList: {
    items: [],
    error: undefined,
    loading: false,
  },
  gatilhoList: {
    items: [],
    error: undefined,
    loading: false,
  },
  tipoEntradaList: {
    items: [],
    error: undefined,
    loading: false,
  },
  ativoList: {
    items: [],
    error: undefined,
    loading: false,
  },
  tipoStopList: {
    items: [],
    error: undefined,
    loading: false,
  },
  localStopList: {
    items: [],
    error: undefined,
    loading: false,
  },
  filtroList: {
    items: [],
    error: undefined,
    loading: false,
  },
  error: undefined,
};
