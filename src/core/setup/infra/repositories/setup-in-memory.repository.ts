import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { v4 as uuid } from "uuid";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

const setupList: Record<any, any>[] = [
  {
    name: 'Vinicius',
  },
  {
    name: 'Jader',
  },
  {
    name: 'Jayne',
  },
  {
    name: 'Jeovana',
  },
  {
    name: 'Vinicius',
  },
  {
    name: 'Jader',
  },
  {
    name: 'Jayne',
  },
  {
    name: 'Jeovana',
  },
  {
    name: 'Vinicius',
  },
  {
    name: 'Jader',
  },
  {
    name: 'Jayne',
  },
  {
    name: 'Jeovana',
  },
];

export class SetupListInMemoryRepository implements
  ListSetupRepositoryContract,
  CreateSetupRepositoryContract,
  UpdateSetupRepositoryContract,
  DeleteSetupRepositoryContract
{
  list(): Promise<ActionResult<SetupEntity[], any>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ActionResult.success(mapSetupListToEntity(setupList)));
      }, 3000);
    });
  }

  create(params: CreateSetupRepositoryContract.Params): Promise<ActionResult<SetupEntity, any>> {
    return new Promise((resolve, reject) => {
      setupList.push(params);
      setTimeout(() => {
        resolve(ActionResult.success(mapSetupToEntity(params)));
      }, 1000);
    });
  }

  update(params: UpdateSetupRepositoryContract.Params): Promise<ActionResult<SetupEntity, string>> {
    return new Promise((resolve, reject) => {
      setupList.push(params);
      setTimeout(() => {
        resolve(ActionResult.success(mapSetupToEntity(setupList[0])));
      }, 1000);
    });
  }

  delete(params: DeleteSetupRepositoryContract.Params): Promise<ActionResult<void, string>> {
    return new Promise((resolve, reject) => {
      setupList.push(params);
      setTimeout(() => {
        resolve(ActionResult.success());
      }, 1000);
    });
  }
}

const mapSetupToEntity = (setup: any): SetupEntity => {
  return new SetupEntity({
    id: uuid(),
    name: setup.name,
    createdAt: setup.createdAt,
    active: setup.active,
    userId: setup.userId,
  });
}

const mapSetupListToEntity = (setupList: Record<any, any>[]): SetupEntity[] => {
  return setupList.map(mapSetupToEntity);
}
