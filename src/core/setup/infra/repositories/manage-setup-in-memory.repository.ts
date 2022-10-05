import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { v4 as uuid } from "uuid";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";
import { chunkArray } from "@/common/utils";

let setupList: Record<any, any>[] = generateSetups();

function generateSetups(num = 501): Record<string, any>[] {
  return Array.from(Array(num).keys()).map((i) => ({
    id: uuid(),
    nome: 'Setup ' + (i + 1),
    ativo: true,
    createdAt: '2022-01-01T00:00:00-03',
    updatedAt: '2022-01-01T00:00:00-03',
    userId: '',
  }));
}

export class ManageSetupInMemoryRepository implements
  ListSetupRepositoryContract,
  CreateSetupRepositoryContract,
  UpdateSetupRepositoryContract,
  DeleteSetupRepositoryContract
{
  list(
    params: ListSetupRepositoryContract.Params
  ): Promise<ActionResult<ListSetupRepositoryContract.Response, any>> {
    return new Promise((resolve) => {
      const itemsPerPage = params.itemsPerPage || setupList.length;
      const items = chunkArray<SetupEntity>(mapSetupListToEntity(setupList), itemsPerPage);
      const page = params.page || 1;
      setTimeout(() => {
        resolve(ActionResult.success({
          items: items[page-1],
          page,
          pageCount: Math.ceil(setupList.length / (itemsPerPage)),
        }));
      }, 3000);
    });
  }

  create(params: CreateSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      setupList.push(mapSetupToEntity(params));
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  update(params: UpdateSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      setupList = setupList.map((setup) => {
        if (params.id === setup.id) {
          return {
            ...setup,
            ...params,
          };
        }
        return setup;
      });
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }

  delete(params: DeleteSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      setupList = setupList.filter((s) => s.id !== params.id);
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }
}

const mapSetupToEntity = (setup: Record<string, any>): SetupEntity => {
  return new SetupEntity({
    id: setup.id || uuid(),
    nome: setup.nome,
    createdAt: setup.createdAt,
    updatedAt: setup.updatedAt,
    ativo: setup.ativo,
    userId: setup.userId,
  });
}

const mapSetupListToEntity = (setupList: Record<string, any>[]): SetupEntity[] => {
  return setupList.map(mapSetupToEntity);
}
