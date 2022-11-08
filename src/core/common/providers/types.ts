import { ChangePasswordRepositoryContract } from "@/core/auth/data/contracts/change-password.repository";

export const TYPES = {
  /* Service Providers */

  /* Use Cases */
  LoginUseCaseContract: Symbol('LoginUseCaseContract'),
  GetCurrentUserUseCaseContract: Symbol('GetCurrentUserUseCaseContract'),
  ChangePasswordUseCaseContract: Symbol('ChangePasswordUseCaseContract'),

  ListUserUseCaseContract: Symbol('ListUserUseCaseContract'),
  CreateUserUseCaseContract: Symbol('CreateUserUseCaseContract'),
  UpdateUserUseCaseContract: Symbol('UpdateUserUseCaseContract'),
  DeleteUserUseCaseContract: Symbol('DeleteUserUseCaseContract'),
  ResetUserPasswordUseCaseContract: Symbol('ResetUserPasswordUseCaseContract'),

  ListSetupUseCaseContract: Symbol('ListSetupUseCaseContract'),
  CreateSetupUseCaseContract: Symbol('CreateSetupUseCaseContract'),
  UpdateSetupUseCaseContract: Symbol('UpdateSetupUseCaseContract'),
  DeleteSetupUseCaseContract: Symbol('DeleteSetupUseCaseContract'),

  ListGatilhoUseCaseContract: Symbol('ListGatilhoUseCaseContract'),
  CreateGatilhoUseCaseContract: Symbol('CreateGatilhoUseCaseContract'),
  UpdateGatilhoUseCaseContract: Symbol('UpdateGatilhoUseCaseContract'),
  DeleteGatilhoUseCaseContract: Symbol('DeleteGatilhoUseCaseContract'),

  ListImportacaoUseCaseContract: Symbol('ListImportacaoUseCaseContract'),
  DeleteImportacaoUseCaseContract: Symbol('DeleteImportacaoUseCaseContract'),

  ListTipoEntradaUseCaseContract: Symbol('ListTipoEntradaUseCaseContract'),
  CreateTipoEntradaUseCaseContract: Symbol('CreateTipoEntradaUseCaseContract'),
  UpdateTipoEntradaUseCaseContract: Symbol('UpdateTipoEntradaUseCaseContract'),
  DeleteTipoEntradaUseCaseContract: Symbol('DeleteTipoEntradaUseCaseContract'),

  ListTipoStopUseCaseContract: Symbol('ListTipoStopUseCaseContract'),
  CreateTipoStopUseCaseContract: Symbol('CreateTipoStopUseCaseContract'),
  UpdateTipoStopUseCaseContract: Symbol('UpdateTipoStopUseCaseContract'),
  DeleteTipoStopUseCaseContract: Symbol('DeleteTipoStopUseCaseContract'),

  ListLocalStopUseCaseContract: Symbol('ListLocalStopUseCaseContract'),
  CreateLocalStopUseCaseContract: Symbol('CreateLocalStopUseCaseContract'),
  UpdateLocalStopUseCaseContract: Symbol('UpdateLocalStopUseCaseContract'),
  DeleteLocalStopUseCaseContract: Symbol('DeleteLocalStopUseCaseContract'),

  ListTradeUseCaseContract: Symbol('ListTradeUseCaseContract'),
  CreateTradeUseCaseContract: Symbol('CreateTradeUseCaseContract'),
  UpdateTradeUseCaseContract: Symbol('UpdateTradeUseCaseContract'),
  DeleteTradeUseCaseContract: Symbol('DeleteTradeUseCaseContract'),
  UploadFileToImportTradeUseCaseContract: Symbol('UploadFileToImportTradeUseCaseContract'),
  SaveImportedFileTradeUseCaseContract: Symbol('SaveImportedFileTradeUseCaseContract'),
  UploadTradeImageUseCaseContract: Symbol('UploadTradeImageUseCaseContract'),

  GetTradeSumBySetupUseCaseContract: Symbol('GetTradeSumBySetupUseCaseContract'),
  GetTradeSumByWeekdayUseCaseContract: Symbol('GetTradeSumByWeekdayUseCaseContract'),
  GetTradeSumUseCaseContract: Symbol('GetTradeSumByWeekdayUseCaseContract'),
  GetTradeSumByIntervalUseCaseContract: Symbol('GetTradeSumByIntervalUseCaseContract'),

  ListAtivoUseCaseContract: Symbol('ListAtivoUseCaseContract'),

  ListCampoCustomizavelUseCaseContract: Symbol('ListCampoCustomizavelUseCaseContract'),

  /* Repositories */
  LoginRepositoryContract: Symbol('LoginRepositoryContract'),
  GetCurrentUserRepositoryContract: Symbol('GetCurrentUserRepositoryContract'),
  ChangePasswordRepositoryContract: Symbol('ChangePasswordRepositoryContract'),

  ListUserRepositoryContract: Symbol('ListUserRepositoryContract'),
  CreateUserRepositoryContract: Symbol('CreateUserRepositoryContract'),
  UpdateUserRepositoryContract: Symbol('UpdateUserRepositoryContract'),
  DeleteUserRepositoryContract: Symbol('DeleteUserRepositoryContract'),
  ResetUserPasswordRepositoryContract: Symbol('ResetUserPasswordRepositoryContract'),

  ListSetupRepositoryContract: Symbol('ListSetupRepositoryContract'),
  CreateSetupRepositoryContract: Symbol('CreateSetupRepositoryContract'),
  UpdateSetupRepositoryContract: Symbol('UpdateSetupRepositoryContract'),
  DeleteSetupRepositoryContract: Symbol('DeleteSetupRepositoryContract'),

  ListGatilhoRepositoryContract: Symbol('ListGatilhoRepositoryContract'),
  CreateGatilhoRepositoryContract: Symbol('CreateGatilhoRepositoryContract'),
  UpdateGatilhoRepositoryContract: Symbol('UpdateGatilhoRepositoryContract'),
  DeleteGatilhoRepositoryContract: Symbol('DeleteGatilhoRepositoryContract'),

  ListImportacaoRepositoryContract: Symbol('ListImportacaoRepositoryContract'),
  DeleteImportacaoRepositoryContract: Symbol('DeleteImportacaoRepositoryContract'),

  ListTipoEntradaRepositoryContract: Symbol('ListTipoEntradaRepositoryContract'),
  CreateTipoEntradaRepositoryContract: Symbol('CreateTipoEntradaRepositoryContract'),
  UpdateTipoEntradaRepositoryContract: Symbol('UpdateTipoEntradaRepositoryContract'),
  DeleteTipoEntradaRepositoryContract: Symbol('DeleteTipoEntradaRepositoryContract'),

  ListTipoStopRepositoryContract: Symbol('ListTipoStopRepositoryContract'),
  CreateTipoStopRepositoryContract: Symbol('CreateTipoStopRepositoryContract'),
  UpdateTipoStopRepositoryContract: Symbol('UpdateTipoStopRepositoryContract'),
  DeleteTipoStopRepositoryContract: Symbol('DeleteTipoStopRepositoryContract'),

  ListLocalStopRepositoryContract: Symbol('ListLocalStopRepositoryContract'),
  CreateLocalStopRepositoryContract: Symbol('CreateLocalStopRepositoryContract'),
  UpdateLocalStopRepositoryContract: Symbol('UpdateLocalStopRepositoryContract'),
  DeleteLocalStopRepositoryContract: Symbol('DeleteLocalStopRepositoryContract'),

  ListTradeRepositoryContract: Symbol('ListTradeRepositoryContract'),
  CreateTradeRepositoryContract: Symbol('CreateTradeRepositoryContract'),
  UpdateTradeRepositoryContract: Symbol('UpdateTradeRepositoryContract'),
  DeleteTradeRepositoryContract: Symbol('DeleteTradeRepositoryContract'),
  UploadFileToImportTradeRepositoryContract: Symbol('UploadFileToImportTradeRepositoryContract'),
  ImportUploadedFileTradeRepositoryContract: Symbol('ImportUploadedFileTradeRepositoryContract'),
  UploadTradeImageRepositoryContract: Symbol('UploadTradeImageRepositoryContract'),

  GetTradeSumBySetupRepositoryContract: Symbol('GetTradeSumBySetupRepositoryContract'),
  GetTradeSumByWeekdayRepositoryContract: Symbol('GetTradeSumByWeekdayRepositoryContract'),
  GetTradeSumRepositoryContract: Symbol('GetTradeSumByWeekdayRepositoryContract'),
  GetTradeSumByIntervalRepositoryContract: Symbol('GetTradeSumByIntervalRepositoryContract'),

  ListAtivoRepositoryContract: Symbol('ListAtivoRepositoryContract'),

  ListCampoCustomizavelRepositoryContract: Symbol('ListCampoCustomizavelRepositoryContract'),

  /* State Controllers */
  NotificationController: Symbol('NotificationController'),
  SystemController: Symbol('SystemController'),
  AuthController: Symbol('AuthController'),

  ListUserController: Symbol('ListUserController'),
  CreateOrUpdateUserController: Symbol('CreateOrUpdateUserController'),
  DeleteUserController: Symbol('DeleteUserController'),
  ResetUserPasswordController: Symbol('ResetUserPasswordController'),

  ListSetupController: Symbol('ListSetupController'),
  CreateOrUpdateSetupController: Symbol('CreateOrUpdateSetupController'),
  DeleteSetupController: Symbol('DeleteSetupController'),

  ListGatilhoController: Symbol('ListGatilhoController'),
  CreateOrUpdateGatilhoController: Symbol('CreateOrUpdateGatilhoController'),
  DeleteGatilhoController: Symbol('DeleteGatilhoController'),

  ListImportacaoController: Symbol('ListImportacaoController'),
  DeleteImportacaoController: Symbol('DeleteImportacaoController'),

  ListTipoEntradaController: Symbol('ListTipoEntradaController'),
  CreateOrUpdateTipoEntradaController: Symbol('CreateOrUpdateTipoEntradaController'),
  DeleteTipoEntradaController: Symbol('DeleteTipoEntradaController'),

  ListTradeController: Symbol('ListTradeController'),
  DeleteTradeController: Symbol('DeleteTradeController'),
  ManageTradeController: Symbol('ManageTradeController'),
  ListTradeFilterController: Symbol('ListTradeFilterController'),
  ImportFileTradeController: Symbol('ImportFileTradeController'),

  DashboardController: Symbol('DashboardController'),
};
