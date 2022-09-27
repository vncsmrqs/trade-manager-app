export interface ContainerContract {
  bind<T>(interfaceName: symbol, makeFunction: (container: ContainerContract) => T): void;
  singleton<T>(interfaceName: symbol, makeFunction: (container: ContainerContract) => T): void;
  instance<T>(interfaceName: symbol, instance: T): void;
  make<T>(interfaceName: symbol): T;
}
