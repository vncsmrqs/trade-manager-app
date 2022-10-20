import { ValorCampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/valor-campo-customizavel.entity";

export type CampoCustomizavelEntityProps = {
  id: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ativo: boolean;
  contexto: string;
  valores: ValorCampoCustomizavelEntity[];
}

export class CampoCustomizavelEntity {
  private props: CampoCustomizavelEntityProps;

  constructor(props: CampoCustomizavelEntityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get nome(): string {
    return this.props.nome;
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

  get contexto(): string {
    return this.props.contexto;
  }

  get valores(): ValorCampoCustomizavelEntity[] {
    return this.props.valores;
  }

  public static createFromRaw(raw: any): CampoCustomizavelEntity {
    return new CampoCustomizavelEntity({
      id: raw.id,
      nome: raw.nome,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      ativo: raw.ativo,
      userId: raw.user_id,
      contexto: raw.contexto,
      valores: raw.valores.map((valor: any) => ValorCampoCustomizavelEntity.createFromRaw(valor)),
    });
  }
}
