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
import { ListTradeController } from "@/core/trade/presentation/controllers/list-trade.controller";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { DeleteTradeUseCaseContract } from "@/core/trade/domain/use-cases/delete-trade.use-case";
import { DeleteTradeController } from "@/core/trade/presentation/controllers/delete-trade.controller";
import { ManageTradeController } from "@/core/trade/presentation/controllers/manage-trade.controller";
import { ListTradeFilterController } from "@/core/trade/presentation/controllers/list-trade-filter.controller";
import { ListAtivoUseCaseContract } from "@/core/ativo/domain/use-cases/list-ativo.use-case";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";
import { ImportFileTradeController } from "@/core/trade/presentation/controllers/import-trade.controller";
import { UploadFileToImportTradeUseCaseContract } from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";
import { ImportUploadedFileTradeUseCaseContract } from "@/core/trade/domain/use-cases/import-uploaded-file-trade.use-case";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";
import { DashboardController } from "@/core/dashboard/presentation/controller/dashboard.controller";
import { GetTradeSumBySetupUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { GetTradeSumByWeekdayUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { GetTradeSumUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { GetTradeSumByIntervalUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";
import { ListUserController } from "@/core/user/presentation/controllers/list-user.controller";
import { ListUserUseCaseContract } from "@/core/user/domain/use-cases/list-user.use-case";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";
import { CreateUserUseCaseContract } from "@/core/user/domain/use-cases/create-user.use-case";
import { CreateOrUpdateUserController } from "@/core/user/presentation/controllers/create-or-update-user.controller";
import { DeleteUserController } from "@/core/user/presentation/controllers/delete-user.controller";
import { DeleteUserUseCaseContract } from "@/core/user/domain/use-cases/delete-user.use-case";
import { ListImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/list-importacao.use-case";
import { ListImportacaoController } from "@/core/importacao/presentation/controllers/list-importacao.controller";
import { DeleteImportacaoController } from "@/core/importacao/presentation/controllers/delete-importacao.controller";
import { DeleteImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/delete-importacao.use-case";
import { ChangePasswordUseCaseContract } from "@/core/auth/domain/use-cases/change-password.use-case";
import { ResetUserPasswordController } from "@/core/user/presentation/controllers/reset-user-password.controller";
import { ResetUserPasswordUseCaseContract } from "@/core/user/domain/use-cases/reset-user-password.use-case";

//implementations
export class StateControllerServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    container.singleton(TYPES.NotificationController, () => new NotificationController());
    container.singleton(TYPES.SystemController, () => new SystemController());

  }
  boot(container: ContainerContract): void {
    container.singleton(TYPES.AuthController, () => new AuthController(
      container.make<LoginUseCaseContract>(TYPES.LoginUseCaseContract),
      container.make<GetCurrentUserUseCaseContract>(TYPES.GetCurrentUserUseCaseContract),
      container.make<NotificationController>(TYPES.NotificationController),
      container.make<ChangePasswordUseCaseContract>(TYPES.ChangePasswordUseCaseContract),
    ), ['must-reset-state']);

    this.bootSetupControllers(container);
    this.bootUserControllers(container);
    this.bootGatilhoControllers(container);
    this.bootImportacaoControllers(container);
    this.bootTipoEntradaControllers(container);
    this.bootTradeControllers(container);

    container.singleton(TYPES.DashboardController, () => {
      return new DashboardController(
        container.make<GetTradeSumBySetupUseCaseContract>(TYPES.GetTradeSumBySetupUseCaseContract),
        container.make<GetTradeSumByWeekdayUseCaseContract>(TYPES.GetTradeSumByWeekdayUseCaseContract),
        container.make<GetTradeSumUseCaseContract>(TYPES.GetTradeSumUseCaseContract),
        container.make<GetTradeSumByIntervalUseCaseContract>(TYPES.GetTradeSumByIntervalUseCaseContract),
      );
    }, ['must-reset-state']);
  }

  private bootSetupControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListSetupController, () => {
      return new ListSetupController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
        container.make<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.CreateOrUpdateSetupController, () => {
      return new CreateOrUpdateSetupController(
        container.make<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract),
        container.make<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract),
        container.make<ListSetupController>(TYPES.ListSetupController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteSetupController, () => {
      return new DeleteSetupController(
        container.make<DeleteSetupUseCaseContract>(TYPES.DeleteSetupUseCaseContract),
        container.make<ListSetupController>(TYPES.ListSetupController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    });
  }

  private bootUserControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListUserController, () => {
      return new ListUserController(
        container.make<ListUserUseCaseContract>(TYPES.ListUserUseCaseContract),
        container.make<UpdateUserUseCaseContract>(TYPES.UpdateUserUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.CreateOrUpdateUserController, () => {
      return new CreateOrUpdateUserController(
        container.make<CreateUserUseCaseContract>(TYPES.CreateUserUseCaseContract),
        container.make<UpdateUserUseCaseContract>(TYPES.UpdateUserUseCaseContract),
        container.make<ListUserController>(TYPES.ListUserController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteUserController, () => {
      return new DeleteUserController(
        container.make<DeleteUserUseCaseContract>(TYPES.DeleteUserUseCaseContract),
        container.make<ListUserController>(TYPES.ListUserController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.ResetUserPasswordController, () => {
      return new ResetUserPasswordController(
        container.make<ResetUserPasswordUseCaseContract>(TYPES.ResetUserPasswordUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);
  }

  private bootGatilhoControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListGatilhoController, () => {
      return new ListGatilhoController(
        container.make<ListGatilhoUseCaseContract>(TYPES.ListGatilhoUseCaseContract),
        container.make<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.CreateOrUpdateGatilhoController, () => {
      return new CreateOrUpdateGatilhoController(
        container.make<CreateGatilhoUseCaseContract>(TYPES.CreateGatilhoUseCaseContract),
        container.make<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract),
        container.make<ListGatilhoController>(TYPES.ListGatilhoController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteGatilhoController, () => {
      return new DeleteGatilhoController(
        container.make<DeleteGatilhoUseCaseContract>(TYPES.DeleteGatilhoUseCaseContract),
        container.make<ListGatilhoController>(TYPES.ListGatilhoController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);
  }

  private bootImportacaoControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListImportacaoController, () => {
      return new ListImportacaoController(
        container.make<ListImportacaoUseCaseContract>(TYPES.ListImportacaoUseCaseContract),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteImportacaoController, () => {
      return new DeleteImportacaoController(
        container.make<DeleteImportacaoUseCaseContract>(TYPES.DeleteImportacaoUseCaseContract),
        container.make<ListImportacaoController>(TYPES.ListImportacaoController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);
  }

  private bootTipoEntradaControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListTipoEntradaController, () => {
      return new ListTipoEntradaController(
        container.make<ListTipoEntradaUseCaseContract>(TYPES.ListTipoEntradaUseCaseContract),
        container.make<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.CreateOrUpdateTipoEntradaController, () => {
      return new CreateOrUpdateTipoEntradaController(
        container.make<CreateTipoEntradaUseCaseContract>(TYPES.CreateTipoEntradaUseCaseContract),
        container.make<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract),
        container.make<ListTipoEntradaController>(TYPES.ListTipoEntradaController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteTipoEntradaController, () => {
      return new DeleteTipoEntradaController(
        container.make<DeleteTipoEntradaUseCaseContract>(TYPES.DeleteTipoEntradaUseCaseContract),
        container.make<ListTipoEntradaController>(TYPES.ListTipoEntradaController),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);
  }

  private bootTradeControllers(container: ContainerContract): void {
    container.singleton(TYPES.ListTradeController, () => {
      return new ListTradeController(
        container.make<ListTradeUseCaseContract>(TYPES.ListTradeUseCaseContract),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.DeleteTradeController, () => {
      return new DeleteTradeController(
        container.make<DeleteTradeUseCaseContract>(TYPES.DeleteTradeUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.ManageTradeController, () => {
      return new ManageTradeController(
        container.make<UploadTradeImageUseCaseContract>(TYPES.UploadTradeImageUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
        container.make<CreateTradeUseCaseContract>(TYPES.CreateTradeUseCaseContract),
        container.make<UpdateTradeUseCaseContract>(TYPES.UpdateTradeUseCaseContract),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.ListTradeFilterController, () => {
      return new ListTradeFilterController(
        container.make<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract),
        container.make<ListGatilhoUseCaseContract>(TYPES.ListGatilhoUseCaseContract),
        container.make<ListTipoEntradaUseCaseContract>(TYPES.ListTipoEntradaUseCaseContract),
        container.make<ListAtivoUseCaseContract>(TYPES.ListAtivoUseCaseContract),
        container.make<ListCampoCustomizavelUseCaseContract>(TYPES.ListCampoCustomizavelUseCaseContract),
        container.make<ListTipoStopUseCaseContract>(TYPES.ListTipoStopUseCaseContract),
        container.make<ListLocalStopUseCaseContract>(TYPES.ListLocalStopUseCaseContract),
      );
    }, ['must-reset-state']);

    container.singleton(TYPES.ImportFileTradeController, () => {
      return new ImportFileTradeController(
        container.make<UploadFileToImportTradeUseCaseContract>(TYPES.UploadFileToImportTradeUseCaseContract),
        container.make<ImportUploadedFileTradeUseCaseContract>(TYPES.SaveImportedFileTradeUseCaseContract),
        container.make<NotificationController>(TYPES.NotificationController),
      );
    }, ['must-reset-state']);
  }
}
