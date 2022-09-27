import { ContainerContract } from "./contracts";
import * as appConfig from "./config";

const SINGLETON_TYPE = 'singleton';
const BIND_TYPE = 'bind';
type ServiceTypes = 'singleton' | 'bind';

export class Application implements ContainerContract {
  private singletons: Record<symbol, any> = {};
  private container: Record<symbol, {
    type: ServiceTypes;
    make: () => any;
  }> = {};

  constructor() {
    appConfig.providers.map((provider) => provider.register(this));
    appConfig.providers.map((provider) => provider.boot ? provider.boot(this) : null);
  }

  public singleton<T>(interfaceSymbol: symbol, makeFunction: (container: ContainerContract) => T): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: SINGLETON_TYPE,
      make: (): T => { return makeFunction(this) },
    };
  }

  public instance<T>(interfaceSymbol: symbol, instance: T): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: SINGLETON_TYPE,
      make(): T { return instance },
    };
  }

  public bind<T>(interfaceSymbol: symbol, makeFunction: (container: ContainerContract) => T): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: BIND_TYPE,
      make: (): T => { return makeFunction(this) },
    };
  }

  public make<T = any>(interfaceSymbol: symbol): T {
    const service = this.container[interfaceSymbol];

    if (!service) {
      throw Error(`Interface [${interfaceSymbol.toString()}] has not been registered in container`);
    }

    if (service.type === SINGLETON_TYPE) {
      if (!this.singletons[interfaceSymbol]) {
        this.singletons[interfaceSymbol] = service.make();
      }
      return this.singletons[interfaceSymbol];
    }

    if (service.type === BIND_TYPE) {
      return service.make();
    }

    throw Error(`Type [${service.type}] has not been implemented yet`);
  }
}
