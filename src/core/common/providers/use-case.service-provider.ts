import { TYPES } from "@/core/common/providers/types";

//contracts
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

//implementations
import { ListSetupUseCase } from "@/core/setup/data/implementations/use-cases/list-setup-use.case";
import { CreateSetupUseCase } from "@/core/setup/data/implementations/use-cases/create-setup.use-case";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/update-setup.use-case";
import { UpdateSetupUseCase } from "@/core/setup/data/implementations/use-cases/update-setup.use-case";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/delete-setup.use-case";
import { DeleteSetupUseCase } from "@/core/setup/data/implementations/use-cases/delete-setup.use-case";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

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

    container.bind<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract, () => {
      return new UpdateSetupUseCase(
        container.make<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract),
      );
    });

    container.bind<DeleteSetupUseCaseContract>(TYPES.DeleteSetupUseCaseContract, () => {
      return new DeleteSetupUseCase(
        container.make<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract),
      );
    });
  }
}
