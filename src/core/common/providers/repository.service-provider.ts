import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/setup/list-setup.repository";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/setup/create-setup.repository";

//implementations
import { SetupListInMemoryRepository } from "@/core/setup/infra/repositories/setup-in-memory.repository";

export class RepositoryServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    const instance = new SetupListInMemoryRepository();
    container.instance<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract, instance);
    container.instance<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract, instance);
  }
}
