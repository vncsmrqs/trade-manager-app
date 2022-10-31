import { ContainerContract } from "./contracts";
import * as appConfig from "./config";

const enum RegisterType {
  SINGLETON = 'singleton',
  BIND = 'bind',
}
type RegisterBase = {
  tags?: string[],
  make: () => any;
};

type BindRegister = RegisterBase & {
  type: RegisterType.BIND;
}

type SingletonRegister = RegisterBase & {
  type: RegisterType.SINGLETON,
  instance?: any,
}

type Register = (BindRegister | SingletonRegister);

export class Application implements ContainerContract {
  private container: Record<symbol, Register> = {};

  constructor() {
    appConfig.providers.map((provider) => provider.register(this));
    appConfig.providers.map((provider) => provider.boot ? provider.boot(this) : null);
  }

  public singleton<T>(interfaceSymbol: symbol, makeFunction: (container: ContainerContract) => T, tags?: string[]): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: RegisterType.SINGLETON,
      tags,
      make: (): T => { return makeFunction(this) },
    };
  }

  public instance<T>(interfaceSymbol: symbol, instance: T, tags?: string[]): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: RegisterType.SINGLETON,
      tags,
      make(): T { return instance },
    };
  }

  public bind<T>(interfaceSymbol: symbol, makeFunction: (container: ContainerContract) => T, tags?: string[]): void {
    if (this.container[interfaceSymbol]) {
      throw Error(`Interface [${interfaceSymbol.toString()}] already registered in container`);
    }
    this.container[interfaceSymbol] = {
      type: RegisterType.BIND,
      tags,
      make: (): T => { return makeFunction(this) },
    };
  }

  public make<T = any>(interfaceSymbol: symbol): T {
    const service = this.container[interfaceSymbol];

    if (!service) {
      throw Error(`Interface [${interfaceSymbol.toString()}] has not been registered in container`);
    }

    if (service.type === RegisterType.SINGLETON) {
      if (!service.instance) {
        service.instance = service.make();
      }
      return service.instance;
    }

    if (service.type === RegisterType.BIND) {
      return service.make();
    }

    throw Error(`Register type has not been implemented yet`);
  }

  public makeSingletonsByTag<T>(tag: string): T[] {
    return Reflect.ownKeys(this.container)
      .map((interfaceSymbol) => this.container[interfaceSymbol as symbol])
      .reduce<T[]>((singletons, register) => {
        if (
          register.type === RegisterType.SINGLETON
          && !!register?.tags?.includes(tag)
          && !!register.instance
        ) {
          singletons.push(register.instance);
        }
        return singletons;
      }, []);
  }
}
