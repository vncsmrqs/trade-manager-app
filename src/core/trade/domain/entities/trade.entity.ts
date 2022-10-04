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
  timeFrameId?: string;
  createdAt: string;
  updatedAt: string;
  dataAbertura: string;
  dataFechamento: string;
  lote: string;
  pontuacao: number;
  resultado: TradeResultadoType;
  seguiuPlano?: boolean;
  sentimento?: string;
  primeiroAlvo?: boolean;
  segundoAlvo?: boolean;
  imagemUrl?: string;
  observacao?: string;
}

export type TradeEntityProps = DefaultTradeEntityProps & {
  userNome: string;
  ativoNome: string;
  setupNome?: string;
  gatilhoNome?: string;
  tipoEntradaNome?: string;
  ativoCode: string;
  timeFrameNome?: string;
}

export class TradeEntity {
  private props: TradeEntityProps;

  constructor(props: TradeEntityProps) {
    this.props = props;
  }

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
  get timeFrameId(): string | undefined {
    return this.props.timeFrameId;
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
  get dataAbertura(): string {
    return this.props.dataAbertura;
  }
  get dataFechamento(): string {
    return this.props.dataFechamento;
  }
  get lote(): string {
    return this.props.lote;
  }
  get pontuacao(): number {
    return this.props.pontuacao;
  }
  get resultado(): TradeResultadoType {
    return this.props.resultado;
  }
  get seguiuPlano(): boolean | undefined {
    return this.props.seguiuPlano;
  }
  get sentimento(): string | undefined{
    return this.props.sentimento;
  }
  get primeiroAlvo(): boolean | undefined{
    return this.props.primeiroAlvo;
  }
  get segundoAlvo(): boolean | undefined{
    return this.props.segundoAlvo;
  }
  get imagemUrl(): string | undefined{
    return this.props.imagemUrl;
  }
  get userNome(): string {
    return this.props.userNome;
  }
  get ativoNome(): string {
    return this.props.ativoNome;
  }
  get setupNome(): string | undefined{
    return this.props.setupNome;
  }
  get gatilhoNome(): string | undefined{
    return this.props.gatilhoNome;
  }
  get tipoEntradaNome(): string | undefined{
    return this.props.tipoEntradaNome;
  }
  get ativoCode(): string {
    return this.props.ativoCode;
  }

  get observacao(): string | undefined {
    return this.props.observacao;
  }

  get timeFrameNome(): string | undefined {
    return this.props.timeFrameNome;
  }

  get dataAberturaFormatted(): string {
    return '01/01/2022';
  }

  get horaAberturaFormatted(): string {
    return '00:00';
  }
}
