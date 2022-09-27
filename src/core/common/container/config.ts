import { ServiceProviderContract } from "@/core/common/container/contracts";
import { UseCaseServiceProvider } from "@/core/common/providers/use-case.service-provider";
import { RepositoryServiceProvider } from "@/core/common/providers/repository.service-provider";
import { StateControllerServiceProvider } from "@/core/common/providers/state-controller.service-provider";

export const providers: ServiceProviderContract[] = [
  new UseCaseServiceProvider(),
  new RepositoryServiceProvider(),
  new StateControllerServiceProvider(),
];
