import { TYPES } from "@/core/common/providers/types";

//contracts
import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

//implementations
import { ListSetupUseCase } from "@/core/setup/data/implementations/use-cases/list-setup.use.case";
import { CreateSetupUseCase } from "@/core/setup/data/implementations/use-cases/create-setup.use-case";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/create-setup.use-case";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { UpdateSetupUseCase } from "@/core/setup/data/implementations/use-cases/update-setup.use-case";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupUseCaseContract } from "@/core/setup/domain/use-cases/delete-setup.use-case";
import { DeleteSetupUseCase } from "@/core/setup/data/implementations/use-cases/delete-setup.use-case";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";
import { ListGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/list-gatilho.use.case";
import { CreateGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/create-gatilho.use-case";
import { UpdateGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/update-gatilho.use-case";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { CreateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/create-gatilho.use-case";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoUseCase } from "@/core/gatilho/data/implementations/use-cases/delete-gatilho.use-case";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";
import { ListTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/list-tipo-entrada.use.case";
import { CreateTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/create-tipo-entrada.use-case";
import { UpdateTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/update-tipo-entrada.use-case";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";
import { CreateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/create-tipo-entrada.use-case";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";
import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaUseCase } from "@/core/tipo-entrada/data/implementations/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";
import { ListTradeUseCase } from "@/core/trade/data/implementations/use-cases/list-trade.use.case";
import { CreateTradeUseCase } from "@/core/trade/data/implementations/use-cases/create-trade.use-case";
import { UpdateTradeUseCase } from "@/core/trade/data/implementations/use-cases/update-trade.use-case";
import { UpdateTradeUseCaseContract } from "@/core/trade/domain/use-cases/update-trade.use-case";
import { CreateTradeUseCaseContract } from "@/core/trade/domain/use-cases/create-trade.use-case";
import { ListTradeUseCaseContract } from "@/core/trade/domain/use-cases/list-trade.use-case";
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeUseCaseContract } from "@/core/trade/domain/use-cases/delete-trade.use-case";
import { DeleteTradeUseCase } from "@/core/trade/data/implementations/use-cases/delete-trade.use-case";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { ListAtivoUseCaseContract } from "@/core/ativo/domain/use-cases/list-ativo.use-case";
import { ListAtivoUseCase } from "@/core/ativo/data/implementations/use-cases/list-ativo.use.case";
import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { ListTimeFrameUseCaseContract } from "@/core/time-frame/domain/use-cases/list-time-frame.use-case";
import { ListTimeFrameUseCase } from "@/core/time-frame/data/implementations/use-cases/list-time-frame.use.case";
import { ListTimeFrameRepositoryContract } from "@/core/time-frame/data/contracts/list-time-frame.repository";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";
import { ListCampoCustomizavelUseCase } from "@/core/campo-customizavel/data/implementations/use-cases/list-campo-customizavel.use.case";
import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";

export class UseCaseServiceProvider implements ServiceProviderContract {
  register(): void {}
  boot(container: ContainerContract): void {
    this.bootSetupUseCases(container);
    this.bootGatilhoUseCases(container);
    this.bootTipoEntradaUseCases(container);
    this.bootTradeUseCases(container);
    this.bootAtivoUseCases(container);
    this.bootTimeFrameUseCases(container);
    this.bootCampoCustomizavelUseCases(container);
  }

  private bootSetupUseCases(container: ContainerContract): void {
    container.bind<ListSetupUseCaseContract>(TYPES.ListSetupUseCaseContract, () => {
      return new ListSetupUseCase(
        container.make<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract),
      );
    });

    container.bind<CreateSetupUseCaseContract>(TYPES.CreateSetupUseCaseContract, () => {
      return new CreateSetupUseCase(
        container.make<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract),
      );
    });

    container.bind<UpdateSetupUseCaseContract>(TYPES.UpdateSetupUseCaseContract, () => {
      return new UpdateSetupUseCase(
        container.make<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract),
      );
    });

    container.bind<DeleteSetupUseCaseContract>(TYPES.DeleteSetupUseCaseContract, () => {
      return new DeleteSetupUseCase(
        container.make<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract),
      );
    });
  }

  private bootGatilhoUseCases(container: ContainerContract): void {
    container.bind<ListGatilhoUseCaseContract>(TYPES.ListGatilhoUseCaseContract, () => {
      return new ListGatilhoUseCase(
        container.make<ListGatilhoRepositoryContract>(TYPES.ListGatilhoRepositoryContract),
      );
    });

    container.bind<CreateGatilhoUseCaseContract>(TYPES.CreateGatilhoUseCaseContract, () => {
      return new CreateGatilhoUseCase(
        container.make<CreateGatilhoRepositoryContract>(TYPES.CreateGatilhoRepositoryContract),
      );
    });

    container.bind<UpdateGatilhoUseCaseContract>(TYPES.UpdateGatilhoUseCaseContract, () => {
      return new UpdateGatilhoUseCase(
        container.make<UpdateGatilhoRepositoryContract>(TYPES.UpdateGatilhoRepositoryContract),
      );
    });

    container.bind<DeleteGatilhoUseCaseContract>(TYPES.DeleteGatilhoUseCaseContract, () => {
      return new DeleteGatilhoUseCase(
        container.make<DeleteGatilhoRepositoryContract>(TYPES.DeleteGatilhoRepositoryContract),
      );
    });
  }

  private bootTipoEntradaUseCases(container: ContainerContract): void {
    container.bind<ListTipoEntradaUseCaseContract>(TYPES.ListTipoEntradaUseCaseContract, () => {
      return new ListTipoEntradaUseCase(
        container.make<ListTipoEntradaRepositoryContract>(TYPES.ListTipoEntradaRepositoryContract),
      );
    });

    container.bind<CreateTipoEntradaUseCaseContract>(TYPES.CreateTipoEntradaUseCaseContract, () => {
      return new CreateTipoEntradaUseCase(
        container.make<CreateTipoEntradaRepositoryContract>(TYPES.CreateTipoEntradaRepositoryContract),
      );
    });

    container.bind<UpdateTipoEntradaUseCaseContract>(TYPES.UpdateTipoEntradaUseCaseContract, () => {
      return new UpdateTipoEntradaUseCase(
        container.make<UpdateTipoEntradaRepositoryContract>(TYPES.UpdateTipoEntradaRepositoryContract),
      );
    });

    container.bind<DeleteTipoEntradaUseCaseContract>(TYPES.DeleteTipoEntradaUseCaseContract, () => {
      return new DeleteTipoEntradaUseCase(
        container.make<DeleteTipoEntradaRepositoryContract>(TYPES.DeleteTipoEntradaRepositoryContract),
      );
    });
  }

  private bootTradeUseCases(container: ContainerContract): void {
    container.bind<ListTradeUseCaseContract>(TYPES.ListTradeUseCaseContract, () => {
      return new ListTradeUseCase(
        container.make<ListTradeRepositoryContract>(TYPES.ListTradeRepositoryContract),
      );
    });

    container.bind<CreateTradeUseCaseContract>(TYPES.CreateTradeUseCaseContract, () => {
      return new CreateTradeUseCase(
        container.make<CreateTradeRepositoryContract>(TYPES.CreateTradeRepositoryContract),
      );
    });

    container.bind<UpdateTradeUseCaseContract>(TYPES.UpdateTradeUseCaseContract, () => {
      return new UpdateTradeUseCase(
        container.make<UpdateTradeRepositoryContract>(TYPES.UpdateTradeRepositoryContract),
      );
    });

    container.bind<DeleteTradeUseCaseContract>(TYPES.DeleteTradeUseCaseContract, () => {
      return new DeleteTradeUseCase(
        container.make<DeleteTradeRepositoryContract>(TYPES.DeleteTradeRepositoryContract),
      );
    });
  }

  private bootAtivoUseCases(container: ContainerContract): void {
    container.bind<ListAtivoUseCaseContract>(TYPES.ListAtivoUseCaseContract, () => {
      return new ListAtivoUseCase(
        container.make<ListAtivoRepositoryContract>(TYPES.ListAtivoRepositoryContract),
      );
    });
  }

  private bootTimeFrameUseCases(container: ContainerContract): void {
    container.bind<ListTimeFrameUseCaseContract>(TYPES.ListTimeFrameUseCaseContract, () => {
      return new ListTimeFrameUseCase(
        container.make<ListTimeFrameRepositoryContract>(TYPES.ListTimeFrameRepositoryContract),
      );
    });
  }

  private bootCampoCustomizavelUseCases(container: ContainerContract): void {
    container.bind<ListCampoCustomizavelUseCaseContract>(TYPES.ListCampoCustomizavelUseCaseContract, () => {
      return new ListCampoCustomizavelUseCase(
        container.make<ListCampoCustomizavelRepositoryContract>(TYPES.ListCampoCustomizavelRepositoryContract),
      );
    });
  }
}
