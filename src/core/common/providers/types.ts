import { CreateSetupController } from "@/core/setup/presentation/controllers/create-setup.controller";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export const TYPES = {
  /* Service Providers */

  /* Use Cases */
  ListSetupUseCaseContract: Symbol('ListSetupUseCaseContract'),
  CreateSetupUseCaseContract: Symbol('CreateSetupUseCaseContract'),

  /* Repositories */
  ListSetupRepositoryContract: Symbol('ListSetupRepositoryContract'),
  CreateSetupRepositoryContract: Symbol('CreateSetupRepositoryContract'),

  /* View Controllers */
  SetupViewController: Symbol('SetupViewController'),
  CreateSetupController: Symbol('CreateSetupController'),
  NotificationController: Symbol('NotificationController'),
};



