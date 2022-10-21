import moment from "moment";
import { Entity } from "@/core/common/domain/entity";

export type TradeResultadoType = 'gain' | 'loss' | '0x0';
export type TradeSentimentoType = 'bem' | 'neutro' | 'mal';

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
  lote: string;
  pontuacao: number;
  valorResultado: number;
  resultado: TradeResultadoType;
  seguiuPlano?: boolean;
  sentimento?: TradeSentimentoType;
  primeiroAlvo?: boolean;
  segundoAlvo?: boolean;
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

  get lote(): string {
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

  get primeiroAlvo(): boolean | undefined {
    return this.props.primeiroAlvo;
  }

  get segundoAlvo(): boolean | undefined {
    return this.props.segundoAlvo;
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
    return moment(this.props.dataTrade).format('DD/MM/YYYY');
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
      primeiroAlvo: createBoolean(raw.primeiro_alvo),
      segundoAlvo: createBoolean(raw.segundo_alvo),
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
