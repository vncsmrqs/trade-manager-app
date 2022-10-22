export type TipoStopEntityProps = {
  id: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ativo: boolean;
}

export class TipoStopEntity {
  private props: TipoStopEntityProps;

  constructor(props: TipoStopEntityProps) {
    this.props = props;
  }

  get nome(): string {
    return this.props.nome;
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get ativo(): boolean {
    return this.props.ativo;
  }

  set ativo(value: boolean) {
    this.props.ativo = value;
  }

  get updatedAt(): string {
    return this.props.updatedAt;
  }

  public static createFromRaw(raw: any): TipoStopEntity {
    return new TipoStopEntity({
      id: raw.id,
      nome: raw.nome,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      ativo: raw.ativo,
      userId: raw.userId,
    });
  }
}
