import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/update-setup.use-case";
import { DeleteSetupController } from "@/core/setup/presentation/controllers/delete-setup.controller";

export const TYPES = {
  /* Service Providers */

  /* Use Cases */
  ListSetupUseCaseContract: Symbol('ListSetupUseCaseContract'),
  CreateSetupUseCaseContract: Symbol('CreateSetupUseCaseContract'),
  UpdateSetupUseCaseContract: Symbol('UpdateSetupUseCaseContract'),
  DeleteSetupUseCaseContract: Symbol('DeleteSetupUseCaseContract'),

  /* Repositories */
  ListSetupRepositoryContract: Symbol('ListSetupRepositoryContract'),
  CreateSetupRepositoryContract: Symbol('CreateSetupRepositoryContract'),
  UpdateSetupRepositoryContract: Symbol('UpdateSetupRepositoryContract'),
  DeleteSetupRepositoryContract: Symbol('DeleteSetupRepositoryContract'),

  /* View Controllers */
  ListSetupController: Symbol('ListSetupController'),
  CreateOrSetupController: Symbol('CreateOrSetupController'),
  NotificationController: Symbol('NotificationController'),
  SystemController: Symbol('SystemController'),
  AuthController: Symbol('AuthController'),
  DeleteSetupController: Symbol('DeleteSetupController'),
};



