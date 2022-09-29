import { CreateSetupController } from "@/core/setup/presentation/controllers/setup/create-setup.controller";
import { NotifierController } from "@/core/setup/presentation/controllers/setup/notifier.controller";

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
  NotifierController: Symbol('NotifierController'),
};



