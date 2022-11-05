import DateUtils from "@/common/date.utils";

export type ImportacaoEntityProps = {
  id: string;
  arquivoNome: string;
  arquivoPath: string;
  tradeCount: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export class ImportacaoEntity {
  private props: ImportacaoEntityProps;

  constructor(props: ImportacaoEntityProps) {
    this.props = props;
  }

  get arquivoNome(): string {
    return this.props.arquivoNome;
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get createdAtFormatted(): string {
    return DateUtils.formatDatetimeFieldValue(this.props.createdAt);
  }

  get tradeCount(): number {
    return this.props.tradeCount;
  }

  get updatedAt(): string {
    return this.props.updatedAt;
  }

  public static createFromRaw(raw: any): ImportacaoEntity {
    return new ImportacaoEntity({
      id: raw.id,
      arquivoNome: raw.arquivo_nome,
      arquivoPath: raw.arquivo_path,
      tradeCount: raw.trade_count,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      userId: raw.user_id,
    });
  }
}
