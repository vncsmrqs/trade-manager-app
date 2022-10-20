import { v4 as uuid } from "uuid";

export type AtivoEntityProps = {
  id: string;
  nome: string;
  codigo: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  ativo: boolean;
}

export class AtivoEntity {
  private props: AtivoEntityProps;

  constructor(props: AtivoEntityProps) {
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

  get codigo(): string {
    return this.props.codigo;
  }

  public static createFromRaw(raw: any): AtivoEntity {
    return new AtivoEntity({
      id: raw.id,
      nome: raw.nome,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      ativo: raw.ativo,
      userId: raw.user_id,
      codigo: raw.codigo,
    });
  }
}
