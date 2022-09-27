import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/setup/list-setup.repository";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/setup/create-setup.repository";

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
];

export class SetupListInMemoryRepository implements
  ListSetupRepositoryContract,
  CreateSetupRepositoryContract
{
  list(): Promise<ActionResult<SetupEntity[], any>> {
    return new Promise((resolve) => {
      resolve(ActionResult.success(mapSetupListToEntity(setupList)));
    });
  }

  create(params: CreateSetupRepositoryContract.Params): Promise<ActionResult<SetupEntity, any>> {
    return new Promise((resolve) => {
      setupList.push(params);
      resolve(ActionResult.success(mapSetupToEntity(params)));
    });
  }
}

const mapSetupToEntity = (setup: any): SetupEntity => {
  return new SetupEntity({
    name: setup.name,
    createdAt: setup.createdAt,
    active: setup.active,
    description: setup.description,
    userId: setup.userId,
  });
}

const mapSetupListToEntity = (setupList: Record<any, any>[]): SetupEntity[] => {
  return setupList.map(mapSetupToEntity);
}
