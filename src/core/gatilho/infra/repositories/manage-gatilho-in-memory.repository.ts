import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { GatilhoEntity } from "@/core/gatilho/domain/entities/gatilho.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { v4 as uuid } from "uuid";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";
import { chunkArray } from "@/common/utils";

let gatilhoList: Record<any, any>[] = generateGatilhos();

function generateGatilhos(num = 501): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => ({
    id: uuid(),
    nome: 'Gatilho ' + (i + 1),
    ativo: true,
    createdAt: '2022-01-01T00:00:00-03',
    updatedAt: '2022-01-01T00:00:00-03',
    userId: '',
  }));
}

export class ManageGatilhoInMemoryRepository implements
  ListGatilhoRepositoryContract,
  CreateGatilhoRepositoryContract,
  UpdateGatilhoRepositoryContract,
  DeleteGatilhoRepositoryContract
{
  list(
    params: ListGatilhoRepositoryContract.Params
  ): Promise<ActionResult<ListGatilhoRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const items = chunkArray<GatilhoEntity>(mapGatilhoListToEntity(gatilhoList), params.itemsPerPage);
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(gatilhoList.length / (params.itemsPerPage || 1)),
        }));
      }, 3000);
    });
  }

  create(params: CreateGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      gatilhoList.push(mapGatilhoToEntity(params));
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  update(params: UpdateGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      gatilhoList = gatilhoList.map((gatilho) => {
        if (params.id === gatilho.id) {
          return {
            ...gatilho,
            ...params,
          };
        }
        return gatilho;
      });
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  delete(params: DeleteGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      gatilhoList = gatilhoList.filter((s) => s.id !== params.id);
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }
}

const mapGatilhoToEntity = (gatilho: Record<string, any>): GatilhoEntity => {
  return new GatilhoEntity({
    id: gatilho.id || uuid(),
    nome: gatilho.nome,
    createdAt: gatilho.createdAt,
    updatedAt: gatilho.updatedAt,
    ativo: gatilho.ativo,
    userId: gatilho.userId,
  });
}

const mapGatilhoListToEntity = (gatilhoList: Record<string, any>[]): GatilhoEntity[] => {
  return gatilhoList.map(mapGatilhoToEntity);
}
