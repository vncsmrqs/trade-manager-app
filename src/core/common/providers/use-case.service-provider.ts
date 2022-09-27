import { TYPES } from "@/core/common/providers/types";

//contracts
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/setup/list-setup.repository";
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

//implementations
import { ListSetupUseCase } from "@/core/setup/data/implementations/use-cases/setup/list-setup-use.case";
import { CreateSetupUseCase } from "@/core/setup/data/implementations/use-cases/setup/create-setup.use-case";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/setup/create-setup.repository";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";

export class UseCaseServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    container.bind<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract, () => {
      return new ListSetupUseCase(
        container.make<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract),
      );
    });

    container.bind<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract, () => {
      return new CreateSetupUseCase(
        container.make<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract),
      );
    });
  }
}
