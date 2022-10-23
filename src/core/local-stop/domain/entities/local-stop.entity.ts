export type LocalStopEntityProps = {
  id: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ativo: boolean;
}

export class LocalStopEntity {
  private props: LocalStopEntityProps;

  constructor(props: LocalStopEntityProps) {
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

  public static createFromRaw(raw: any): LocalStopEntity {
    return new LocalStopEntity({
      id: raw.id,
      nome: raw.nome,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      ativo: raw.ativo,
      userId: raw.userId,
    });
  }
}
