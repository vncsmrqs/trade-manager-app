import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";
import { ListSetupController } from "@/core/setup/presentation/controllers/list-setup.controller";
import { CreateOrUpdateSetupController } from "@/core/setup/presentation/controllers/create-or-update-setup.controller";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/create-setup.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { SystemController } from "@/core/system/presentation/controllers/system.controller";
import { AuthController } from "@/core/auth/presentation/controllers/auth.controller";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { DeleteSetupController } from "@/core/setup/presentation/controllers/delete-setup.controller";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/delete-setup.use-case";
import { ListGatilhoController } from "@/core/gatilho/presentation/controllers/list-gatilho.controller";
import { DeleteGatilhoController } from "@/core/gatilho/presentation/controllers/delete-gatilho.controller";
import { CreateOrUpdateGatilhoController } from "@/core/gatilho/presentation/controllers/create-or-update-gatilho.controller";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import { ListTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/list-tipo-entrada.controller";
import { DeleteTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/delete-tipo-entrada.controller";
import { CreateOrUpdateTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/create-or-update-tipo-entrada.controller";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";
import { DeleteTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/delete-tipo-entrada.use-case";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";

//implementations
export class StateControllerServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    this.bootSetupControllers(container);
    this.bootGatilhoControllers(container);
    this.bootTipoEntradaControllers(container);

    container.singleton(TYPES.NotificationController, () => new NotificationController());

    container.singleton(TYPES.SystemController, () => new SystemController());

    container.singleton(TYPES.AuthController, () => new AuthController());
  }


  private bootSetupControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListSetupController, () => {
      return new ListSetupController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
        container.make<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract),
      );
    });

    container.singleton(TYPES.CreateOrUpdateSetupController, () => {
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
  }

  private bootGatilhoControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListGatilhoController, () => {
      return new ListGatilhoController(
        container.make<ListGatilhoUseCaseContract>(TYPES.ListGatilhoUseCaseContract),
        container.make<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract),
      );
    });

    container.singleton(TYPES.CreateOrUpdateGatilhoController, () => {
      return new CreateOrUpdateGatilhoController(
        container.make<CreateGatilhoUseCaseContract>(TYPES.CreateGatilhoUseCaseContract),
        container.make<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract),
        container.make<ListGatilhoController>(TYPES.ListGatilhoController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    });

    container.singleton(TYPES.DeleteGatilhoController, () => {
      return new DeleteGatilhoController(
        container.make<DeleteGatilhoUseCaseContract>(TYPES.DeleteGatilhoUseCaseContract),
        container.make<ListGatilhoController>(TYPES.ListGatilhoController),
      );
    });
  }

  private bootTipoEntradaControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListTipoEntradaController, () => {
      return new ListTipoEntradaController(
        container.make<ListTipoEntradaUseCaseContract>(TYPES.ListTipoEntradaUseCaseContract),
        container.make<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract),
      );
    });

    container.singleton(TYPES.CreateOrUpdateTipoEntradaController, () => {
      return new CreateOrUpdateTipoEntradaController(
        container.make<CreateTipoEntradaUseCaseContract>(TYPES.CreateTipoEntradaUseCaseContract),
        container.make<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract),
        container.make<ListTipoEntradaController>(TYPES.ListTipoEntradaController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    });

    container.singleton(TYPES.DeleteTipoEntradaController, () => {
      return new DeleteTipoEntradaController(
        container.make<DeleteTipoEntradaUseCaseContract>(TYPES.DeleteTipoEntradaUseCaseContract),
        container.make<ListTipoEntradaController>(TYPES.ListTipoEntradaController),
      );
    });
  }
}
