import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";
import { TimeFrameEntity } from "@/core/time-frame/domain/entities/time-frame.entity";

export type BaseListTradeFilterState = {
  setupList: SetupEntity[];
  gatilhoList: GatilhoEntity[];
  tipoEntradaList: TipoEntradaEntity[];
  ativoList: AtivoEntity[];
  timeFrameList: TimeFrameEntity[];
  localizacaoList: CampoCustomizavelEntity[];
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
  timeFrameList: [],
  localizacaoList: [],
  error: undefined,
};
