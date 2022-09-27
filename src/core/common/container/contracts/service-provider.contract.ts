import { ContainerContract } from "./container.contract";

export interface ServiceProviderContract {
  register(container: ContainerContract): void;
  boot?(container: ContainerContract): void;
}
