import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { AtivoEntity } from "@/core/ativo/domain/entities/ativo.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { v4 as uuid } from "uuid";
import { chunkArray } from "@/common/utils";

const ativoList: Record<any, any>[] = generateAtivos();

function generateAtivos(num = 501): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => ({
    id: uuid(),
    nome: 'Ativo ' + (i + 1),
    ativo: true,
    createdAt: '2022-01-01T00:00:00-03',
    updatedAt: '2022-01-01T00:00:00-03',
    userId: '',
    codigo: 'ATV' + (i + 1),
  }));
}

export class ManageAtivoInMemoryRepository implements
  ListAtivoRepositoryContract
{
  list(
    params: ListAtivoRepositoryContract.Params
  ): Promise<ActionResult<ListAtivoRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const itemsPerPage = params.itemsPerPage || ativoList.length;
      const items = chunkArray<AtivoEntity>(mapAtivoListToEntity(ativoList), itemsPerPage);
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(ativoList.length / (itemsPerPage || 1)),
        }));
      }, 3000);
    });
  }
}

const mapAtivoToEntity = (ativo: Record<string, any>): AtivoEntity => {
  return new AtivoEntity({
    id: ativo.id || uuid(),
    nome: ativo.nome,
    createdAt: ativo.createdAt,
    updatedAt: ativo.updatedAt,
    ativo: ativo.ativo,
    userId: ativo.userId,
    codigo: ativo.codigo,
  });
}

const mapAtivoListToEntity = (ativoList: Record<string, any>[]): AtivoEntity[] => {
  return ativoList.map(mapAtivoToEntity);
}
