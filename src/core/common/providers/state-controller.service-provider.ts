import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { ListSetupController } from "@/core/setup/presentation/controllers/list-setup.controller";
import { CreateOrUpdateSetupController } from "@/core/setup/presentation/controllers/create-or-update-setup.controller";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/update-setup.use-case";
import { DeleteSetupController } from "@/core/setup/presentation/controllers/delete-setup.controller";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/delete-setup.use-case";

//implementations
export class StateControllerServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    container.singleton(TYPES.ListSetupController, () => {
      return new ListSetupController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
        container.make<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract),
      );
    });

    container.singleton(TYPES.CreateOrSetupController, () => {
      return new CreateOrUpdateSetupController(
        container.make<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract),
        container.make<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract),
        container.make<ListSetupController>(TYPES.ListSetupController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    });

    container.singleton(TYPES.DeleteSetupController, () => {
      return new DeleteSetupController(
        container.make<DeleteSetupUseCaseContract>(TYPES.DeleteSetupUseCaseContract),
        container.make<ListSetupController>(TYPES.ListSetupController),
      );
    });

    container.singleton(TYPES.NotificationController, () => new NotificationController());

    container.singleton(TYPES.SystemController, () => new SystemController());

    container.singleton(TYPES.AuthController, () => new AuthController());
  }
}
