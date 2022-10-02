import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { DeleteSetupController } from "@/core/setup/presentation/controllers/delete-setup.controller";

export const TYPES = {
  /* Service Providers */

  /* Use Cases */
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
};
