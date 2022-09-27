import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";

//implementations
export class StateControllerServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    container.singleton(TYPES.SetupViewController, () => {
      return new SetupViewController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
        container.make<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract),
      );
    });
  }
}
