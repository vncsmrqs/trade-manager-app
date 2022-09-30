import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";

//implementations
import { ManageSetupInMemoryRepository } from "@/core/setup/infra/repositories/manage-setup-in-memory.repository";
import { ManageGatilhoInMemoryRepository } from "@/core/gatilho/infra/repositories/manage-gatilho-in-memory.repository";


export class RepositoryServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    const manageSetupRepository = new ManageSetupInMemoryRepository();
    container.instance<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract, manageSetupRepository);
    container.instance<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract, manageSetupRepository);
    container.instance<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract, manageSetupRepository);
    container.instance<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract, manageSetupRepository);

    const manageGatilhoRepository = new ManageGatilhoInMemoryRepository();
    container.instance<ListGatilhoRepositoryContract>(TYPES.ListGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<CreateGatilhoRepositoryContract>(TYPES.CreateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<UpdateGatilhoRepositoryContract>(TYPES.UpdateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<DeleteGatilhoRepositoryContract>(TYPES.DeleteGatilhoRepositoryContract, manageGatilhoRepository);
  }
}
