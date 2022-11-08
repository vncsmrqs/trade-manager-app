import { TYPES } from "@/core/common/providers/types";

//contracts
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

//implementations
import { ListSetupUseCase } from "@/core/setup/data/implementations/use-cases/list-setup.use.case";
import { CreateSetupUseCase } from "@/core/setup/data/implementations/use-cases/create-setup.use-case";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/create-setup.use-case";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { UpdateSetupUseCase } from "@/core/setup/data/implementations/use-cases/update-setup.use-case";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/delete-setup.use-case";
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
import { ListTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/list-tipo-entrada.use.case";
import { CreateTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/create-tipo-entrada.use-case";
import { UpdateTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/update-tipo-entrada.use-case";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";
import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";
import { ListTradeUseCase } from "@/core/trade/data/implementations/use-cases/list-trade.use.case";
import { CreateTradeUseCase } from "@/core/trade/data/implementations/use-cases/create-trade.use-case";
import { UpdateTradeUseCase } from "@/core/trade/data/implementations/use-cases/update-trade.use-case";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeUseCaseContract } from "@/core/trade/domain/use-cases/delete-trade.use-case";
import { DeleteTradeUseCase } from "@/core/trade/data/implementations/use-cases/delete-trade.use-case";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { ListAtivoUseCaseContract } from "@/core/ativo/domain/use-cases/list-ativo.use-case";
import { ListAtivoUseCase } from "@/core/ativo/data/implementations/use-cases/list-ativo.use.case";
import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";
import { ListCampoCustomizavelUseCase } from "@/core/campo-customizavel/data/implementations/use-cases/list-campo-customizavel.use.case";
import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { UploadFileToImportTradeUseCaseContract } from "@/core/trade/domain/use-cases/upload-file-to-import-trade.use-case";
import { ImportUploadedFileTradeUseCaseContract } from "@/core/trade/domain/use-cases/import-uploaded-file-trade.use-case";
import { UploadFileToImportTradeUseCase } from "@/core/trade/data/implementations/use-cases/upload-file-to-import-trade.use-case";
import { UploadFileToImportTradeRepositoryContract } from "@/core/trade/data/contracts/upload-file-to-import-trade.repository";
import { ImportUploadedFileTradeUseCase } from "@/core/trade/data/implementations/use-cases/import-uploaded-file-trade.use-case";
import { ImportUploadedFileTradeRepositoryContract } from "@/core/trade/data/contracts/import-uploaded-file-trade.repository";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";
import { UploadTradeImageUseCase } from "@/core/trade/data/implementations/use-cases/upload-trade-image-use.case";
import { UploadTradeImageRepositoryContract } from "@/core/trade/data/contracts/upload-image-trade.repository";
import { GetTradeSumBySetupUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { GetTradeSumByWeekdayUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-weekday.use-case";
import { GetTradeSumUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum.use-case";
import { GetTradeSumByIntervalUseCaseContract } from "@/core/dashboard/domain/use-cases/get-trade-sum-by-interval.use-case";
import { GetTradeSumByIntervalUseCase } from "@/core/dashboard/data/implementations/use-cases/get-trade-sum-by-interval.use-case";
import { GetTradeSumUseCase } from "@/core/dashboard/data/implementations/use-cases/get-trade-sum.use-case";
import { GetTradeSumByWeekdayUseCase } from "@/core/dashboard/data/implementations/use-cases/get-trade-sum-by-weekday.use-case";
import { GetTradeSumBySetupUseCase } from "@/core/dashboard/data/implementations/use-cases/get-trade-sum-by-setup.use-case";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";
import { LoginUseCase } from "@/core/auth/data/implementations/use-cases/login.use-case";
import { GetCurrentUserUseCase } from "@/core/auth/data/implementations/use-cases/get-current-user.use-case";
import { GetTradeSumBySetupRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-setup.respository";
import { GetTradeSumByWeekdayRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-weekday.respository";
import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";
import { GetTradeSumByIntervalRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-interval.repository";
import { LoginRepositoryContract } from "@/core/auth/data/contracts/login.repository";
import { GetCurrentUserRepositoryContract } from "@/core/auth/data/contracts/get-current-user.repository";
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";
import { ListTipoStopUseCase } from "@/core/tipo-stop/data/implementations/use-cases/list-tipo-stop.use.case";
import { ListTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/list-tipo-stop.repository";
import { CreateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/create-tipo-stop.use-case";
import { CreateTipoStopUseCase } from "@/core/tipo-stop/data/implementations/use-cases/create-tipo-stop.use-case";
import { CreateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/create-tipo-stop.repository";
import { UpdateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/update-tipo-stop.use-case";
import { UpdateTipoStopUseCase } from "@/core/tipo-stop/data/implementations/use-cases/update-tipo-stop.use-case";
import { UpdateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/update-tipo-stop.repository";
import { DeleteTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/delete-tipo-stop.use-case";
import { DeleteTipoStopUseCase } from "@/core/tipo-stop/data/implementations/use-cases/delete-tipo-stop.use-case";
import { DeleteTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/delete-tipo-stop.repository";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";
import { ListLocalStopUseCase } from "@/core/local-stop/data/implementations/use-cases/list-local-stop.use.case";
import { ListLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/list-local-stop.repository";
import { CreateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/create-local-stop.use-case";
import { CreateLocalStopUseCase } from "@/core/local-stop/data/implementations/use-cases/create-local-stop.use-case";
import { CreateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/create-local-stop.repository";
import { UpdateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/update-local-stop.use-case";
import { UpdateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/update-local-stop.repository";
import { UpdateLocalStopUseCase } from "@/core/local-stop/data/implementations/use-cases/update-local-stop.use-case";
import { DeleteLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/delete-local-stop.use-case";
import { DeleteLocalStopUseCase } from "@/core/local-stop/data/implementations/use-cases/delete-local-stop.use-case";
import { DeleteLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/delete-local-stop.repository";
import { ListUserUseCaseContract } from "@/core/user/domain/use-cases/list-user.use-case";
import { ListUserUseCase } from "@/core/user/data/implementations/use-cases/list-user.use.case";
import { ListUserRepositoryContract } from "@/core/user/data/contracts/list-user.repository";
import { CreateUserUseCaseContract } from "@/core/user/domain/use-cases/create-user.use-case";
import { CreateUserUseCase } from "@/core/user/data/implementations/use-cases/create-user.use-case";
import { CreateUserRepositoryContract } from "@/core/user/data/contracts/create-user.repository";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";
import { UpdateUserUseCase } from "@/core/user/data/implementations/use-cases/update-user.use-case";
import { UpdateUserRepositoryContract } from "@/core/user/data/contracts/update-user.repository";
import { DeleteUserUseCaseContract } from "@/core/user/domain/use-cases/delete-user.use-case";
import { DeleteUserUseCase } from "@/core/user/data/implementations/use-cases/delete-user.use-case";
import { DeleteUserRepositoryContract } from "@/core/user/data/contracts/delete-user.repository";
import { ListImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/list-importacao.use-case";
import { ListImportacaoUseCase } from "@/core/importacao/data/implementations/use-cases/list-importacao.use.case";
import { ListImportacaoRepositoryContract } from "@/core/importacao/data/contracts/list-importacao.repository";
import { DeleteImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/delete-importacao.use-case";
import { DeleteImportacaoUseCase } from "@/core/importacao/data/implementations/use-cases/delete-importacao.use-case";
import { DeleteImportacaoRepositoryContract } from "@/core/importacao/data/contracts/delete-importacao.repository";
import { ChangePasswordUseCaseContract } from "@/core/auth/domain/use-cases/change-password.use-case";
import { ChangePasswordUseCase } from "@/core/auth/data/implementations/use-cases/change-password.use-case";
import { ChangePasswordRepositoryContract } from "@/core/auth/data/contracts/change-password.repository";
import { ResetUserPasswordUseCaseContract } from "@/core/user/domain/use-cases/reset-user-password.use-case";
import { ResetUserPasswordUseCase } from "@/core/user/data/implementations/use-cases/reset-user-password.use-case";
import { ResetUserPasswordRepositoryContract } from "@/core/user/data/contracts/reset-user-password.repository";

export class UseCaseServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    this.bootAuthUseCases(container);
    this.bootSetupUseCases(container);
    this.bootUserUseCases(container);
    this.bootGatilhoUseCases(container);
    this.bootImportacaoUseCases(container);
    this.bootTipoEntradaUseCases(container);
    this.bootTipoStopUseCases(container);
    this.bootLocalStopUseCases(container);
    this.bootTradeUseCases(container);
    this.bootAtivoUseCases(container);
    this.bootCampoCustomizavelUseCases(container);
    this.bootDashboardUseCases(container);
  }

  private bootAuthUseCases(container: ContainerContract) {
    container.bind<LoginUseCaseContract>(TYPES.LoginUseCaseContract, () => {
      return new LoginUseCase(
        container.make<LoginRepositoryContract>(TYPES.LoginRepositoryContract),
      );
    });

    container.bind<GetCurrentUserUseCaseContract>(TYPES.GetCurrentUserUseCaseContract, () => {
      return new GetCurrentUserUseCase(
        container.make<GetCurrentUserRepositoryContract>(TYPES.GetCurrentUserRepositoryContract),
      );
    });

    container.bind<ChangePasswordUseCaseContract>(TYPES.ChangePasswordUseCaseContract, () => {
      return new ChangePasswordUseCase(
        container.make<ChangePasswordRepositoryContract>(TYPES.ChangePasswordRepositoryContract),
      );
    });
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

    container.bind<ResetUserPasswordUseCaseContract>(TYPES.ResetUserPasswordUseCaseContract, () => {
      return new ResetUserPasswordUseCase(
        container.make<ResetUserPasswordRepositoryContract>(TYPES.ResetUserPasswordRepositoryContract),
      );
    });
  }

  private bootUserUseCases(container: ContainerContract): void {
    container.bind<ListUserUseCaseContract>(TYPES.ListUserUseCaseContract, () => {
      return new ListUserUseCase(
        container.make<ListUserRepositoryContract>(TYPES.ListUserRepositoryContract),
      );
    });

    container.bind<CreateUserUseCaseContract>(TYPES.CreateUserUseCaseContract, () => {
      return new CreateUserUseCase(
        container.make<CreateUserRepositoryContract>(TYPES.CreateUserRepositoryContract),
      );
    });

    container.bind<UpdateUserUseCaseContract>(TYPES.UpdateUserUseCaseContract, () => {
      return new UpdateUserUseCase(
        container.make<UpdateUserRepositoryContract>(TYPES.UpdateUserRepositoryContract),
      );
    });

    container.bind<DeleteUserUseCaseContract>(TYPES.DeleteUserUseCaseContract, () => {
      return new DeleteUserUseCase(
        container.make<DeleteUserRepositoryContract>(TYPES.DeleteUserRepositoryContract),
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

  private bootImportacaoUseCases(container: ContainerContract): void {
    container.bind<ListImportacaoUseCaseContract>(TYPES.ListImportacaoUseCaseContract, () => {
      return new ListImportacaoUseCase(
        container.make<ListImportacaoRepositoryContract>(TYPES.ListImportacaoRepositoryContract),
      );
    });

    container.bind<DeleteImportacaoUseCaseContract>(TYPES.DeleteImportacaoUseCaseContract, () => {
      return new DeleteImportacaoUseCase(
        container.make<DeleteImportacaoRepositoryContract>(TYPES.DeleteImportacaoRepositoryContract),
      );
    });
  }

  private bootTipoEntradaUseCases(container: ContainerContract): void {
    container.bind<ListTipoEntradaUseCaseContract>(TYPES.ListTipoEntradaUseCaseContract, () => {
      return new ListTipoEntradaUseCase(
        container.make<ListTipoEntradaRepositoryContract>(TYPES.ListTipoEntradaRepositoryContract),
      );
    });

    container.bind<CreateTipoEntradaUseCaseContract>(TYPES.CreateTipoEntradaUseCaseContract, () => {
      return new CreateTipoEntradaUseCase(
        container.make<CreateTipoEntradaRepositoryContract>(TYPES.CreateTipoEntradaRepositoryContract),
      );
    });

    container.bind<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract, () => {
      return new UpdateTipoEntradaUseCase(
        container.make<UpdateTipoEntradaRepositoryContract>(TYPES.UpdateTipoEntradaRepositoryContract),
      );
    });

    container.bind<DeleteTipoEntradaUseCaseContract>(TYPES.DeleteTipoEntradaUseCaseContract, () => {
      return new DeleteTipoEntradaUseCase(
        container.make<DeleteTipoEntradaRepositoryContract>(TYPES.DeleteTipoEntradaRepositoryContract),
      );
    });
  }

  private bootTipoStopUseCases(container: ContainerContract): void {
    container.bind<ListTipoStopUseCaseContract>(TYPES.ListTipoStopUseCaseContract, () => {
      return new ListTipoStopUseCase(
        container.make<ListTipoStopRepositoryContract>(TYPES.ListTipoStopRepositoryContract),
      );
    });

    container.bind<CreateTipoStopUseCaseContract>(TYPES.CreateTipoStopUseCaseContract, () => {
      return new CreateTipoStopUseCase(
        container.make<CreateTipoStopRepositoryContract>(TYPES.CreateTipoStopRepositoryContract),
      );
    });

    container.bind<UpdateTipoStopUseCaseContract>(TYPES.UpdateTipoStopUseCaseContract, () => {
      return new UpdateTipoStopUseCase(
        container.make<UpdateTipoStopRepositoryContract>(TYPES.UpdateTipoStopRepositoryContract),
      );
    });

    container.bind<DeleteTipoStopUseCaseContract>(TYPES.DeleteTipoStopUseCaseContract, () => {
      return new DeleteTipoStopUseCase(
        container.make<DeleteTipoStopRepositoryContract>(TYPES.DeleteTipoStopRepositoryContract),
      );
    });
  }

  private bootLocalStopUseCases(container: ContainerContract): void {
    container.bind<ListLocalStopUseCaseContract>(TYPES.ListLocalStopUseCaseContract, () => {
      return new ListLocalStopUseCase(
        container.make<ListLocalStopRepositoryContract>(TYPES.ListLocalStopRepositoryContract),
      );
    });

    container.bind<CreateLocalStopUseCaseContract>(TYPES.CreateLocalStopUseCaseContract, () => {
      return new CreateLocalStopUseCase(
        container.make<CreateLocalStopRepositoryContract>(TYPES.CreateLocalStopRepositoryContract),
      );
    });

    container.bind<UpdateLocalStopUseCaseContract>(TYPES.UpdateLocalStopUseCaseContract, () => {
      return new UpdateLocalStopUseCase(
        container.make<UpdateLocalStopRepositoryContract>(TYPES.UpdateLocalStopRepositoryContract),
      );
    });

    container.bind<DeleteLocalStopUseCaseContract>(TYPES.DeleteLocalStopUseCaseContract, () => {
      return new DeleteLocalStopUseCase(
        container.make<DeleteLocalStopRepositoryContract>(TYPES.DeleteLocalStopRepositoryContract),
      );
    });
  }

  private bootTradeUseCases(container: ContainerContract): void {
    container.bind<ListTradeUseCaseContract>(TYPES.ListTradeUseCaseContract, () => {
      return new ListTradeUseCase(
        container.make<ListTradeRepositoryContract>(TYPES.ListTradeRepositoryContract),
      );
    });

    container.bind<CreateTradeUseCaseContract>(TYPES.CreateTradeUseCaseContract, () => {
      return new CreateTradeUseCase(
        container.make<CreateTradeRepositoryContract>(TYPES.CreateTradeRepositoryContract),
      );
    });

    container.bind<UpdateTradeUseCaseContract>(TYPES.UpdateTradeUseCaseContract, () => {
      return new UpdateTradeUseCase(
        container.make<UpdateTradeRepositoryContract>(TYPES.UpdateTradeRepositoryContract),
      );
    });

    container.bind<DeleteTradeUseCaseContract>(TYPES.DeleteTradeUseCaseContract, () => {
      return new DeleteTradeUseCase(
        container.make<DeleteTradeRepositoryContract>(TYPES.DeleteTradeRepositoryContract),
      );
    });

    container.bind<UploadFileToImportTradeUseCaseContract>(TYPES.UploadFileToImportTradeUseCaseContract, () => {
      return new UploadFileToImportTradeUseCase(
        container.make<UploadFileToImportTradeRepositoryContract>(TYPES.UploadFileToImportTradeRepositoryContract),
      );
    });

    container.bind<ImportUploadedFileTradeUseCaseContract>(TYPES.SaveImportedFileTradeUseCaseContract, () => {
      return new ImportUploadedFileTradeUseCase(
        container.make<ImportUploadedFileTradeRepositoryContract>(TYPES.ImportUploadedFileTradeRepositoryContract),
      );
    });

    container.bind<UploadTradeImageUseCaseContract>(TYPES.UploadTradeImageUseCaseContract, () => {
      return new UploadTradeImageUseCase(
        container.make<UploadTradeImageRepositoryContract>(TYPES.UploadTradeImageRepositoryContract),
      );
    });
  }

  private bootAtivoUseCases(container: ContainerContract): void {
    container.bind<ListAtivoUseCaseContract>(TYPES.ListAtivoUseCaseContract, () => {
      return new ListAtivoUseCase(
        container.make<ListAtivoRepositoryContract>(TYPES.ListAtivoRepositoryContract),
      );
    });
  }

  private bootCampoCustomizavelUseCases(container: ContainerContract): void {
    container.bind<ListCampoCustomizavelUseCaseContract>(TYPES.ListCampoCustomizavelUseCaseContract, () => {
      return new ListCampoCustomizavelUseCase(
        container.make<ListCampoCustomizavelRepositoryContract>(TYPES.ListCampoCustomizavelRepositoryContract),
      );
    });
  }

  private bootDashboardUseCases(container: ContainerContract) {
    container.bind<GetTradeSumBySetupUseCaseContract>(TYPES.GetTradeSumBySetupUseCaseContract, () => {
      return new GetTradeSumBySetupUseCase(
        container.make<GetTradeSumBySetupRepositoryContract>(TYPES.GetTradeSumBySetupRepositoryContract)
      );
    });

    container.bind<GetTradeSumByWeekdayUseCaseContract>(TYPES.GetTradeSumByWeekdayUseCaseContract, () => {
      return new GetTradeSumByWeekdayUseCase(
        container.make<GetTradeSumByWeekdayRepositoryContract>(TYPES.GetTradeSumByWeekdayRepositoryContract)
      );
    });

    container.bind<GetTradeSumUseCaseContract>(TYPES.GetTradeSumUseCaseContract, () => {
      return new GetTradeSumUseCase(
        container.make<GetTradeSumRepositoryContract>(TYPES.GetTradeSumRepositoryContract)
      );
    });

    container.bind<GetTradeSumByIntervalUseCaseContract>(TYPES.GetTradeSumByIntervalUseCaseContract, () => {
      return new GetTradeSumByIntervalUseCase(
        container.make<GetTradeSumByIntervalRepositoryContract>(TYPES.GetTradeSumByIntervalRepositoryContract)
      );
    });
  }
}
