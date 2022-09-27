import { Application } from "./application";

class ApplicationSingleton {
  private static instance: Application;
  static getApp(): Application {
    if (!ApplicationSingleton.instance) {
      ApplicationSingleton.instance = new Application();
    }
    return ApplicationSingleton.instance;
  }
}

export const app = ApplicationSingleton.getApp();
