export interface ContainerContract {
  bind<T>(interfaceName: symbol, makeFunction: (container: ContainerContract) => T, tags?: string[]): void;
  singleton<T>(interfaceName: symbol, makeFunction: (container: ContainerContract) => T, tags?: string[]): void;
  instance<T>(interfaceName: symbol, instance: T, tags?: string[]): void;
  make<T>(interfaceName: symbol): T;
}
