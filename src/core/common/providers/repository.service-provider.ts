import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";

//implementations
import { SetupListInMemoryRepository } from "@/core/setup/infra/repositories/setup-in-memory.repository";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

export class RepositoryServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    const instance = new SetupListInMemoryRepository();
    container.instance<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract, instance);
    container.instance<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract, instance);
    container.instance<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract, instance);
    container.instance<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract, instance);
  }
}
