import moment from "moment";
import { Entity } from "@/core/common/domain/entity";
import DateUtils from "@/common/date.utils";

export type TradeResultadoType = 'gain' | 'loss' | '0x0';
export type TradeSentimentoType = 'bem' | 'neutro' | 'mal';

export enum TradeSaidaEnum {
  NA = 'na',
  PRIMEIRO_ALVO = 'primeiro_alvo',
  SEGUNDO_ALVO = 'segundo_alvo',
  TERCEIRO_ALVO = 'terceiro_alvo',
}

export const tradeSaidaLabelList = {
  PRIMEIRO_ALVO: '1º Alvo',
  SEGUNDO_ALVO: '2º Alvo',
  TERCEIRO_ALVO: '3º Alvo',
  NA: 'N/A',
}

export type DefaultTradeEntityProps = {
  id: string;
  userId: string;
  ativoId: string;
  setupId?: string;
  gatilhoId?: string;
  tipoEntradaId?: string;
  tradeImportacaoId?: string;
  tipoStopId?: string;
  localStopId?: string;
  createdAt: string;
  updatedAt: string;
  dataTrade: string;
  horaTrade: string;
  lote: number;
  pontuacao: number;
  valorResultado: number;
  resultado: TradeResultadoType;
  seguiuPlano?: boolean;
  sentimento?: TradeSentimentoType;
  saidaParcial?: TradeSaidaEnum;
  saidaFinal?: TradeSaidaEnum;
  imagemPath?: string;
  observacao?: string;
  filtros: Record<string, string>;
}

export type TradeEntityProps = DefaultTradeEntityProps & {
  userNome: string;
  ativoNome: string;
  setupNome?: string;
  gatilhoNome?: string;
  tipoEntradaNome?: string;
  ativoCodigo: string;
  tipoStopNome?: string;
  localStopNome?: string;
  imagemUrl?: string;
}

export class TradeEntity extends Entity<TradeEntityProps>{
  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get ativoId(): string {
    return this.props.ativoId;
  }

  get setupId(): string | undefined {
    return this.props.setupId;
  }

  get gatilhoId(): string | undefined {
    return this.props.gatilhoId;
  }

  get tipoEntradaId(): string | undefined {
    return this.props.tipoEntradaId;
  }

  get tipoStopId(): string | undefined {
    return this.props.tipoStopId;
  }

  get localStopId(): string | undefined {
    return this.props.localStopId;
  }

  get tradeImportacaoId(): string | undefined {
    return this.props.tradeImportacaoId;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get updatedAt(): string {
    return this.props.updatedAt;
  }

  get dataTrade(): string {
    return this.props.dataTrade;
  }

  get horaTrade(): string {
    return this.props.horaTrade;
  }

  get lote(): number {
    return this.props.lote;
  }

  get pontuacao(): number {
    return this.props.pontuacao;
  }

  get valorResultado(): number {
    return this.props.valorResultado;
  }

  get resultado(): TradeResultadoType {
    return this.props.resultado;
  }

  get seguiuPlano(): boolean | undefined {
    return this.props.seguiuPlano;
  }

  get sentimento(): TradeSentimentoType | undefined {
    return this.props.sentimento;
  }

  get saidaParcial(): TradeSaidaEnum | undefined {
    return this.props.saidaParcial;
  }

  get saidaFinal(): TradeSaidaEnum | undefined {
    return this.props.saidaFinal;
  }

  get imagemUrl(): string | undefined {
    return this.props.imagemUrl;
  }

  get imagemPath(): string | undefined {
    return this.props.imagemPath;
  }

  get userNome(): string {
    return this.props.userNome;
  }

  get ativoNome(): string {
    return this.props.ativoNome;
  }

  get setupNome(): string | undefined {
    return this.props.setupNome;
  }

  get gatilhoNome(): string | undefined {
    return this.props.gatilhoNome;
  }

  get tipoEntradaNome(): string | undefined {
    return this.props.tipoEntradaNome;
  }

  get tipoStopNome(): string | undefined {
    return this.props.tipoStopNome;
  }

  get localStopNome(): string | undefined {
    return this.props.localStopNome;
  }

  get ativoCodigo(): string {
    return this.props.ativoCodigo;
  }

  get observacao(): string | undefined {
    return this.props.observacao;
  }

  get filtros(): Record<string, string> {
    return this.props.filtros;
  }

  get dataTradeFormatted(): string {
    return DateUtils.formatDateFieldValue(this.props.dataTrade);
  }

  get tipoImportacaoLabel(): string {
    return this.props.tradeImportacaoId ? 'Arquivo' :  'Manual';
  }

  public static createFromRaw(raw: any): TradeEntity {
    return new TradeEntity({
      id: raw.id,
      userId: raw.user_id,
      ativoId: raw.ativo_id,
      setupId : raw.setup_id,
      gatilhoId : raw.gatilho_id,
      tipoEntradaId : raw.tipo_entrada_id,
      tradeImportacaoId : raw.trade_importacao_id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      dataTrade: raw.data_trade,
      horaTrade: raw.hora_trade,
      lote: raw.lote,
      pontuacao: raw.pontuacao,
      resultado: raw.resultado,
      valorResultado: raw.valor_resultado,
      seguiuPlano: createBoolean(raw.seguiu_plano),
      sentimento: raw.sentimento,
      saidaParcial: raw.saida_parcial,
      saidaFinal: raw.saida_final,
      imagemUrl: raw.imagem_url,
      imagemPath: raw.imagem_path,
      userNome: raw.user_nome,
      ativoNome: raw.ativo_nome,
      setupNome: raw.setup_nome,
      gatilhoNome: raw.gatilho_nome,
      tipoEntradaNome: raw.tipo_entrada_nome,
      tipoStopNome: raw.tipo_stop_nome,
      localStopNome: raw.local_stop_nome,
      ativoCodigo: raw.ativo_codigo,
      observacao: raw.observacao,
      filtros: raw.filtros.reduce((filtros: any, filtro: any) => ({
        ...filtros,
        [filtro.campo_customizavel_id]: filtro.id,
      }), {}),
    });
  }
}

const createBoolean = (value: any): boolean | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return !!value;
}
