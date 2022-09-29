import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup-view.controller";
import { CreateSetupController } from "@/core/setup/presentation/controllers/create-setup.controller";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";

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

    container.singleton(TYPES.NotificationController, () => new NotificationController());

    container.singleton(TYPES.SystemController, () => new SystemController());

    container.singleton(TYPES.AuthController, () => new AuthController());
  }
}
