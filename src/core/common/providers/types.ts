export const TYPES = {
  /* Service Providers */

  /* Use Cases */
  LoginUseCaseContract: Symbol('LoginUseCaseContract'),
  GetCurrentUserUseCaseContract: Symbol('GetCurrentUserUseCaseContract'),

  ListSetupUseCaseContract: Symbol('ListSetupUseCaseContract'),
  CreateSetupUseCaseContract: Symbol('CreateSetupUseCaseContract'),
  UpdateSetupUseCaseContract: Symbol('UpdateSetupUseCaseContract'),
  DeleteSetupUseCaseContract: Symbol('DeleteSetupUseCaseContract'),

  ListGatilhoUseCaseContract: Symbol('ListGatilhoUseCaseContract'),
  CreateGatilhoUseCaseContract: Symbol('CreateGatilhoUseCaseContract'),
  UpdateGatilhoUseCaseContract: Symbol('UpdateGatilhoUseCaseContract'),
  DeleteGatilhoUseCaseContract: Symbol('DeleteGatilhoUseCaseContract'),

  ListTipoEntradaUseCaseContract: Symbol('ListTipoEntradaUseCaseContract'),
  CreateTipoEntradaUseCaseContract: Symbol('CreateTipoEntradaUseCaseContract'),
  UpdateTipoEntradaUseCaseContract: Symbol('UpdateTipoEntradaUseCaseContract'),
  DeleteTipoEntradaUseCaseContract: Symbol('DeleteTipoEntradaUseCaseContract'),

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

  ListTimeFrameUseCaseContract: Symbol('ListTimeFrameUseCaseContract'),

  ListCampoCustomizavelUseCaseContract: Symbol('ListCampoCustomizavelUseCaseContract'),

  /* Repositories */
  ListSetupRepositoryContract: Symbol('ListSetupRepositoryContract'),
  CreateSetupRepositoryContract: Symbol('CreateSetupRepositoryContract'),
  UpdateSetupRepositoryContract: Symbol('UpdateSetupRepositoryContract'),
  DeleteSetupRepositoryContract: Symbol('DeleteSetupRepositoryContract'),

  ListGatilhoRepositoryContract: Symbol('ListGatilhoRepositoryContract'),
  CreateGatilhoRepositoryContract: Symbol('CreateGatilhoRepositoryContract'),
  UpdateGatilhoRepositoryContract: Symbol('UpdateGatilhoRepositoryContract'),
  DeleteGatilhoRepositoryContract: Symbol('DeleteGatilhoRepositoryContract'),

  ListTipoEntradaRepositoryContract: Symbol('ListTipoEntradaRepositoryContract'),
  CreateTipoEntradaRepositoryContract: Symbol('CreateTipoEntradaRepositoryContract'),
  UpdateTipoEntradaRepositoryContract: Symbol('UpdateTipoEntradaRepositoryContract'),
  DeleteTipoEntradaRepositoryContract: Symbol('DeleteTipoEntradaRepositoryContract'),

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

  ListTimeFrameRepositoryContract: Symbol('ListTimeFrameRepositoryContract'),

  ListCampoCustomizavelRepositoryContract: Symbol('ListCampoCustomizavelRepositoryContract'),

  /* State Controllers */
  NotificationController: Symbol('NotificationController'),
  SystemController: Symbol('SystemController'),
  AuthController: Symbol('AuthController'),

  ListSetupController: Symbol('ListSetupController'),
  CreateOrUpdateSetupController: Symbol('CreateOrUpdateSetupController'),
  DeleteSetupController: Symbol('DeleteSetupController'),

  ListGatilhoController: Symbol('ListGatilhoController'),
  CreateOrUpdateGatilhoController: Symbol('CreateOrUpdateGatilhoController'),
  DeleteGatilhoController: Symbol('DeleteGatilhoController'),

  ListTipoEntradaController: Symbol('ListTipoEntradaController'),
  CreateOrUpdateTipoEntradaController: Symbol('CreateOrUpdateTipoEntradaController'),
  DeleteTipoEntradaController: Symbol('DeleteTipoEntradaController'),

  ListTradeController: Symbol('ListTradeController'),
  CreateOrUpdateTradeController: Symbol('CreateOrUpdateTradeController'),
  DeleteTradeController: Symbol('DeleteTradeController'),
  DetailTradeController: Symbol('DetailTradeController'),
  ListTradeFilterController: Symbol('ListTradeFilterController'),
  ImportFileTradeController: Symbol('ImportFileTradeController'),

  DashboardController: Symbol('DashboardController'),
};
