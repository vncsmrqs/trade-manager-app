import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { TipoEntradaEntity } from "@/core/tipo-entrada/domain/entities/tipo-entrada.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { v4 as uuid } from "uuid";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";
import { chunkArray } from "@/common/utils";

let tipoEntradaList: Record<any, any>[] = generateTipoEntradas();

function generateTipoEntradas(num = 501): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => ({
    id: uuid(),
    nome: 'TipoEntrada ' + (i + 1),
    ativo: true,
    createdAt: '2022-01-01T00:00:00-03',
    updatedAt: '2022-01-01T00:00:00-03',
    userId: '',
  }));
}

export class ManageTipoEntradaInMemoryRepository implements
  ListTipoEntradaRepositoryContract,
  CreateTipoEntradaRepositoryContract,
  UpdateTipoEntradaRepositoryContract,
  DeleteTipoEntradaRepositoryContract
{
  list(
    params: ListTipoEntradaRepositoryContract.Params
  ): Promise<ActionResult<ListTipoEntradaRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const items = chunkArray<TipoEntradaEntity>(mapTipoEntradaListToEntity(tipoEntradaList), params.itemsPerPage);
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(tipoEntradaList.length / (params.itemsPerPage || 1)),
        }));
      }, 3000);
    });
  }

  create(params: CreateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tipoEntradaList.push(mapTipoEntradaToEntity(params));
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  update(params: UpdateTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tipoEntradaList = tipoEntradaList.map((tipoEntrada) => {
        if (params.id === tipoEntrada.id) {
          return {
            ...tipoEntrada,
            ...params,
          };
        }
        return tipoEntrada;
      });
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  delete(params: DeleteTipoEntradaRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      tipoEntradaList = tipoEntradaList.filter((s) => s.id !== params.id);
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }
}

const mapTipoEntradaToEntity = (tipoEntrada: Record<string, any>): TipoEntradaEntity => {
  return new TipoEntradaEntity({
    id: tipoEntrada.id || uuid(),
    nome: tipoEntrada.nome,
    createdAt: tipoEntrada.createdAt,
    updatedAt: tipoEntrada.updatedAt,
    ativo: tipoEntrada.ativo,
    userId: tipoEntrada.userId,
  });
}

const mapTipoEntradaListToEntity = (tipoEntrada: Record<string, any>[]): TipoEntradaEntity[] => {
  return tipoEntradaList.map(mapTipoEntradaToEntity);
}
