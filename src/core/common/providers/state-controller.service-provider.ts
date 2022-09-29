import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup/setup-view.controller";
import { CreateSetupController } from "@/core/setup/presentation/controllers/setup/create-setup.controller";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { NotifierController } from "@/core/setup/presentation/controllers/setup/notifier.controller";

//implementations
export class StateControllerServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    container.singleton(TYPES.SetupViewController, () => {
      return new SetupViewController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
      );
    });

    container.singleton(TYPES.CreateSetupController, () => {
      return new CreateSetupController(
        container.make<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract),
        container.make<SetupViewController>(TYPES.SetupViewController),
      );
    });

    container.singleton(TYPES.NotifierController, () => {
      return new NotifierController();
    });
  }
}
