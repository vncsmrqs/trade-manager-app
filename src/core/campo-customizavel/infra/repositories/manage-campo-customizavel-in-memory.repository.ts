import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { v4 as uuid } from "uuid";
import { chunkArray } from "@/common/utils";
import {
  mapValorCampoCustomizavelToEntity,
} from "@/core/campo-customizavel/domain/entities/valor-campo-customizavel.entity";

const campoCustomizavelList: Record<any, any>[] = generateCampoCustomizavels();

function generateCampoCustomizavels(num = 5): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => {
    const id = uuid();
    return {
      id,
      nome: 'CampoCustomizavel ' + (i + 1),
      ativo: true,
      createdAt: '2022-01-01T00:00:00-03',
      updatedAt: '2022-01-01T00:00:00-03',
      userId: '',
      contexto: 'localizacao',
      valores: Array.from(Array(2).keys()).map((i) => ({
        campoCustomizavelId: id,
        nome: 'Valor ' + (i + 1),
        createdAt: '2022-01-01T00:00:00-03',
        updatedAt: '2022-01-01T00:00:00-03',
        ativo: true,
        valor: 'valor-' + (i + 1),
      })),
    };
  });
}

export class ManageCampoCustomizavelInMemoryRepository implements
  ListCampoCustomizavelRepositoryContract
{
  list(
    params: ListCampoCustomizavelRepositoryContract.Params
  ): Promise<ActionResult<ListCampoCustomizavelRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const itemsPerPage = params.itemsPerPage || campoCustomizavelList.length;
      const items = chunkArray<CampoCustomizavelEntity>(
        mapCampoCustomizavelListToEntity(campoCustomizavelList),
        itemsPerPage
      );
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(campoCustomizavelList.length / (itemsPerPage)),
        }));
      }, 3000);
    });
  }
}

const mapCampoCustomizavelToEntity = (campoCustomizavel: Record<string, any>): CampoCustomizavelEntity => {
  return new CampoCustomizavelEntity({
    id: campoCustomizavel.id || uuid(),
    nome: campoCustomizavel.nome,
    createdAt: campoCustomizavel.createdAt,
    updatedAt: campoCustomizavel.updatedAt,
    ativo: campoCustomizavel.ativo,
    userId: campoCustomizavel.userId,
    contexto: campoCustomizavel.contexto,
    valores: campoCustomizavel.valores.map((valor: any) => mapValorCampoCustomizavelToEntity(valor)),
  });
}

const mapCampoCustomizavelListToEntity = (campoCustomizavelList: Record<string, any>[]): CampoCustomizavelEntity[] => {
  return campoCustomizavelList.map(mapCampoCustomizavelToEntity);
}
