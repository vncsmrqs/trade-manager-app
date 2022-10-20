export type ValorCampoCustomizavelEntityProps = {
  id: string;
  campoCustomizavelId: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  ativo: boolean;
}

export class ValorCampoCustomizavelEntity {
  private props: ValorCampoCustomizavelEntityProps;

  constructor(props: ValorCampoCustomizavelEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get campoCustomizavelId(): string {
    return this.props.campoCustomizavelId;
  }

  get nome(): string {
    return this.props.nome;
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

  public static createFromRaw(raw: any): ValorCampoCustomizavelEntity {
    return new ValorCampoCustomizavelEntity({
      id: raw.id,
      campoCustomizavelId: raw.campoCustomizavel_id,
      nome: raw.nome,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      ativo: raw.ativo,
    });
  }
}


