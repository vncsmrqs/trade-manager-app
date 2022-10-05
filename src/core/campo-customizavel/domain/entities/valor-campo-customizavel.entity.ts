import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import { v4 as uuid } from "uuid";

export type ValorCampoCustomizavelEntityProps = {
  campoCustomizavelId: string;
  nome: string;
  createdAt: string;
  updatedAt: string;
  valor: string;
  ativo: boolean;
}

export class ValorCampoCustomizavelEntity {
  private props: ValorCampoCustomizavelEntityProps;

  constructor(props: ValorCampoCustomizavelEntityProps) {
    this.props = props;
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

  get valor(): string {
    return this.props.valor;
  }
}

export const mapValorCampoCustomizavelToEntity = (valorcampoCustomizavel: Record<string, any>): ValorCampoCustomizavelEntity => {
  return new ValorCampoCustomizavelEntity({
    campoCustomizavelId: valorcampoCustomizavel.campoCustomizavelId,
    nome: valorcampoCustomizavel.nome,
    createdAt: valorcampoCustomizavel.createdAt,
    updatedAt: valorcampoCustomizavel.updatedAt,
    ativo: valorcampoCustomizavel.ativo,
    valor: valorcampoCustomizavel.valor,
  });
}
