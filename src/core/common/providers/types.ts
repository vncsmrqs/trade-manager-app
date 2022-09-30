import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/update-setup.use-case";
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

  /* Repositories */
  ListSetupRepositoryContract: Symbol('ListSetupRepositoryContract'),
  CreateSetupRepositoryContract: Symbol('CreateSetupRepositoryContract'),
  UpdateSetupRepositoryContract: Symbol('UpdateSetupRepositoryContract'),
  DeleteSetupRepositoryContract: Symbol('DeleteSetupRepositoryContract'),

  ListGatilhoRepositoryContract: Symbol('ListGatilhoRepositoryContract'),
  CreateGatilhoRepositoryContract: Symbol('CreateGatilhoRepositoryContract'),
  UpdateGatilhoRepositoryContract: Symbol('UpdateGatilhoRepositoryContract'),
  DeleteGatilhoRepositoryContract: Symbol('DeleteGatilhoRepositoryContract'),

  /* State Controllers */
  NotificationController: Symbol('NotificationController'),
  SystemController: Symbol('SystemController'),
  AuthController: Symbol('AuthController'),

  ListSetupController: Symbol('ListSetupController'),
  CreateOrUpdateSetupController: Symbol('CreateOrUpdateSetupController'),
  DeleteSetupController: Symbol('DeleteSetupController'),

  ListGatilhoController: Symbol('ListSetupController'),
  CreateOrUpdateGatilhoController: Symbol('CreateOrSetupController'),
  DeleteGatilhoController: Symbol('DeleteSetupController'),

};



