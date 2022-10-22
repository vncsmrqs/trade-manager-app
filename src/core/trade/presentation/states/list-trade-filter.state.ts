import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export type BaseListTradeFilterState = {
  setupList: SetupEntity[];
  gatilhoList: GatilhoEntity[];
  tipoEntradaList: TipoEntradaEntity[];
  ativoList: AtivoEntity[];
  tipoStopList: TipoStopEntity[],
  localStopList: LocalStopEntity[],
  filtroList: CampoCustomizavelEntity[];
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
}

export type ListTradeFilterState = (
  InitialListTradeFilterState |
  LoadingListTradeFilterState |
  LoadedListTradeFilterState |
  ErrorListTradeFilterState
) & BaseListTradeFilterState;

export const initialListTradeFilterState: ListTradeFilterState = {
  kind: "InitialListTradeFilterState",
  setupList: [],
  gatilhoList: [],
  tipoEntradaList: [],
  ativoList: [],
  tipoStopList: [],
  localStopList: [],
  filtroList: [],
  error: undefined,
};
