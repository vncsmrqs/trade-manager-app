import { TYPES } from "@/core/common/providers/types";

//contracts
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

//implementations
import { ListSetupUseCase } from "@/core/setup/data/implementations/use-cases/list-setup.use.case";
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
import { ListGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/list-gatilho.use.case";
import { CreateGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/create-gatilho.use-case";
import { UpdateGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/update-gatilho.use-case";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";

export class UseCaseServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    this.bootSetupUseCases(container);
    this.bootGatilhoUseCases(container);
  }

  private bootSetupUseCases(container: ContainerContract): void {
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

  private bootGatilhoUseCases(container: ContainerContract): void {
    container.bind<ListGatilhoUseCaseContract>(TYPES.ListGatilhoUseCaseContract, () => {
      return new ListGatilhoUseCase(
        container.make<ListGatilhoRepositoryContract>(TYPES.ListGatilhoRepositoryContract),
      );
    });

    container.bind<CreateGatilhoUseCaseContract>(TYPES.CreateGatilhoUseCaseContract, () => {
      return new CreateGatilhoUseCase(
        container.make<CreateGatilhoRepositoryContract>(TYPES.CreateGatilhoRepositoryContract),
      );
    });

    container.bind<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract, () => {
      return new UpdateGatilhoUseCase(
        container.make<UpdateGatilhoRepositoryContract>(TYPES.UpdateGatilhoRepositoryContract),
      );
    });

    container.bind<DeleteGatilhoUseCaseContract>(TYPES.DeleteGatilhoUseCaseContract, () => {
      return new DeleteGatilhoUseCase(
        container.make<DeleteGatilhoRepositoryContract>(TYPES.DeleteGatilhoRepositoryContract),
      );
    });
  }
}
