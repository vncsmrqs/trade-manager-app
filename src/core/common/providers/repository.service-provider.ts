import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";

import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";

//implementations
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { UploadFileToImportTradeRepositoryContract } from "@/core/trade/data/contracts/upload-file-to-import-trade.repository";
import { ImportUploadedFileTradeRepositoryContract } from "@/core/trade/data/contracts/import-uploaded-file-trade.repository";
import { UploadTradeImageRepositoryContract } from "@/core/trade/data/contracts/upload-image-trade.repository";
import { GetTradeSumBySetupRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-setup.respository";
import { GetTradeSumByWeekdayRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-weekday.respository";
import { GetTradeSumRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum.repository";
import { GetTradeSumByIntervalRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-interval.repository";
import { DashboardApiRepository } from "@/core/dashboard/infra/dashboard-api.repository";
import { AuthApiRepository } from "@/core/auth/infra/auth-api.repository";
import { LoginRepositoryContract } from "@/core/auth/data/contracts/login.repository";
import { GetCurrentUserRepositoryContract } from "@/core/auth/data/contracts/get-current-user.repository";
import { ManageSetupApiRepository } from "@/core/setup/infra/repositories/manage-setup-api.repository";
import { ManageTipoEntradaApiRepository } from "@/core/tipo-entrada/infra/repositories/manage-tipo-entrada-api.repository";
import { ManageGatilhoApiRepository } from "@/core/gatilho/infra/repositories/manage-gatilho-api.repository";
import { ManageAtivoApiRepository } from "@/core/ativo/infra/repositories/manage-ativo-api.repository";
import { ManageCampoCustomizavelApiRepository } from "@/core/campo-customizavel/infra/repositories/manage-campo-customizavel-api.repository";
import { ManageTradeApiRepository } from "@/core/trade/infra/repositories/manage-trade-api.repository";
import { ManageTipoStopApiRepository } from "@/core/tipo-stop/infra/repositories/manage-tipo-stop-api.repository";
import { ListTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/list-tipo-stop.repository";
import { CreateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/create-tipo-stop.repository";
import { UpdateTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/update-tipo-stop.repository";
import { DeleteTipoStopRepositoryContract } from "@/core/tipo-stop/data/contracts/delete-tipo-stop.repository";
import { ListLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/list-local-stop.repository";
import { CreateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/create-local-stop.repository";
import { UpdateLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/update-local-stop.repository";
import { DeleteLocalStopRepositoryContract } from "@/core/local-stop/data/contracts/delete-local-stop.repository";
import { ManageLocalStopApiRepository } from "@/core/local-stop/infra/repositories/manage-local-stop-api.repository";
import { ManageUserApiRepository } from "@/core/user/infra/repositories/manage-user-api.repository";
import { ListUserRepositoryContract } from "@/core/user/data/contracts/list-user.repository";
import { CreateUserRepositoryContract } from "@/core/user/data/contracts/create-user.repository";
import { UpdateUserRepositoryContract } from "@/core/user/data/contracts/update-user.repository";
import { DeleteUserRepositoryContract } from "@/core/user/data/contracts/delete-user.repository";
import { ListImportacaoRepositoryContract } from "@/core/importacao/data/contracts/list-importacao.repository";
import { DeleteImportacaoRepositoryContract } from "@/core/importacao/data/contracts/delete-importacao.repository";
import { ManageImportacaoApiRepository } from "@/core/importacao/infra/repositories/manage-importacao-api.repository";
import { ChangePasswordRepositoryContract } from "@/core/auth/data/contracts/change-password.repository";
import { ResetUserPasswordRepositoryContract } from "@/core/user/data/contracts/reset-user-password.repository";

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

export class RepositoryServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    const authApiRepository = new AuthApiRepository(apiBaseUrl);
    container.instance<LoginRepositoryContract>(TYPES.LoginRepositoryContract, authApiRepository);
    container.instance<GetCurrentUserRepositoryContract>(TYPES.GetCurrentUserRepositoryContract, authApiRepository);
    container.instance<ChangePasswordRepositoryContract>(TYPES.ChangePasswordRepositoryContract, authApiRepository);

    const manageSetupRepository = new ManageSetupApiRepository(apiBaseUrl);
    container.instance<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract, manageSetupRepository);
    container.instance<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract, manageSetupRepository);
    container.instance<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract, manageSetupRepository);
    container.instance<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract, manageSetupRepository);

    const manageUserRepository = new ManageUserApiRepository(apiBaseUrl);
    container.instance<ListUserRepositoryContract>(TYPES.ListUserRepositoryContract, manageUserRepository);
    container.instance<CreateUserRepositoryContract>(TYPES.CreateUserRepositoryContract, manageUserRepository);
    container.instance<UpdateUserRepositoryContract>(TYPES.UpdateUserRepositoryContract, manageUserRepository);
    container.instance<DeleteUserRepositoryContract>(TYPES.DeleteUserRepositoryContract, manageUserRepository);
    container.instance<ResetUserPasswordRepositoryContract>(
      TYPES.ResetUserPasswordRepositoryContract,
      manageUserRepository
    );

    const manageGatilhoRepository = new ManageGatilhoApiRepository(apiBaseUrl);
    container.instance<ListGatilhoRepositoryContract>(TYPES.ListGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<CreateGatilhoRepositoryContract>(TYPES.CreateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<UpdateGatilhoRepositoryContract>(TYPES.UpdateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<DeleteGatilhoRepositoryContract>(TYPES.DeleteGatilhoRepositoryContract, manageGatilhoRepository);

    const manageImportacaoRepository = new ManageImportacaoApiRepository(apiBaseUrl);
    container.instance<ListImportacaoRepositoryContract>(
      TYPES.ListImportacaoRepositoryContract,
      manageImportacaoRepository
    );
    container.instance<DeleteImportacaoRepositoryContract>(
      TYPES.DeleteImportacaoRepositoryContract,
      manageImportacaoRepository
    );
    container.instance<UploadFileToImportTradeRepositoryContract>(
      TYPES.UploadFileToImportTradeRepositoryContract,
      manageImportacaoRepository
    );
    container.instance<ImportUploadedFileTradeRepositoryContract>(
      TYPES.ImportUploadedFileTradeRepositoryContract,
      manageImportacaoRepository
    );

    const dashboardRepository = new DashboardApiRepository(apiBaseUrl);
    container.instance<GetTradeSumBySetupRepositoryContract>(
      TYPES.GetTradeSumBySetupRepositoryContract,
      dashboardRepository
    );
    container.instance<GetTradeSumByWeekdayRepositoryContract>(
      TYPES.GetTradeSumByWeekdayRepositoryContract,
      dashboardRepository
    );
    container.instance<GetTradeSumByIntervalRepositoryContract>(
      TYPES.GetTradeSumByIntervalRepositoryContract,
      dashboardRepository
    );
    container.instance<GetTradeSumRepositoryContract>(
      TYPES.GetTradeSumRepositoryContract,
      dashboardRepository
    );

    const manageTipoEntradaRepository = new ManageTipoEntradaApiRepository(apiBaseUrl);
    container.instance<ListTipoEntradaRepositoryContract>(
      TYPES.ListTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<CreateTipoEntradaRepositoryContract>(
      TYPES.CreateTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<UpdateTipoEntradaRepositoryContract>(
      TYPES.UpdateTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<DeleteTipoEntradaRepositoryContract>(
      TYPES.DeleteTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );

    const manageTipoStopRepository = new ManageTipoStopApiRepository(apiBaseUrl);
    container.instance<ListTipoStopRepositoryContract>(
      TYPES.ListTipoStopRepositoryContract,
      manageTipoStopRepository
    );
    container.instance<CreateTipoStopRepositoryContract>(
      TYPES.CreateTipoStopRepositoryContract,
      manageTipoStopRepository
    );
    container.instance<UpdateTipoStopRepositoryContract>(
      TYPES.UpdateTipoStopRepositoryContract,
      manageTipoStopRepository
    );
    container.instance<DeleteTipoStopRepositoryContract>(
      TYPES.DeleteTipoStopRepositoryContract,
      manageTipoStopRepository
    );

    const manageLocalStopRepository = new ManageLocalStopApiRepository(apiBaseUrl);
    container.instance<ListLocalStopRepositoryContract>(
      TYPES.ListLocalStopRepositoryContract,
      manageLocalStopRepository
    );
    container.instance<CreateLocalStopRepositoryContract>(
      TYPES.CreateLocalStopRepositoryContract,
      manageLocalStopRepository
    );
    container.instance<UpdateLocalStopRepositoryContract>(
      TYPES.UpdateLocalStopRepositoryContract,
      manageLocalStopRepository
    );
    container.instance<DeleteLocalStopRepositoryContract>(
      TYPES.DeleteLocalStopRepositoryContract,
      manageLocalStopRepository
    );

    const manageTradeRepository = new ManageTradeApiRepository(apiBaseUrl);
    container.instance<ListTradeRepositoryContract>(TYPES.ListTradeRepositoryContract, manageTradeRepository);
    container.instance<CreateTradeRepositoryContract>(TYPES.CreateTradeRepositoryContract, manageTradeRepository);
    container.instance<UpdateTradeRepositoryContract>(TYPES.UpdateTradeRepositoryContract, manageTradeRepository);
    container.instance<DeleteTradeRepositoryContract>(TYPES.DeleteTradeRepositoryContract, manageTradeRepository);
    container.instance<UploadTradeImageRepositoryContract>(
      TYPES.UploadTradeImageRepositoryContract,
      manageTradeRepository
    );

    const manageAtivoRepository = new ManageAtivoApiRepository(apiBaseUrl);
    container.instance<ListAtivoRepositoryContract>(TYPES.ListAtivoRepositoryContract, manageAtivoRepository);

    const manageCampoCustomizavelRepository = new ManageCampoCustomizavelApiRepository(apiBaseUrl);
    container.instance<ListCampoCustomizavelRepositoryContract>(
      TYPES.ListCampoCustomizavelRepositoryContract,
      manageCampoCustomizavelRepository
    );
  }
}
