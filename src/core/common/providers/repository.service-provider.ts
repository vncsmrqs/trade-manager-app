import { TYPES } from "@/core/common/providers/types";

//contracts
import { ContainerContract, ServiceProviderContract } from "@/core/common/container/contracts";

import { ListSetupRepositoryContract } from "@/core/setup/data/contracts/list-setup.repository";
import { CreateSetupRepositoryContract } from "@/core/setup/data/contracts/create-setup.repository";
import { UpdateSetupRepositoryContract } from "@/core/setup/data/contracts/update-setup.repository";
import { DeleteSetupRepositoryContract } from "@/core/setup/data/contracts/delete-setup.repository";

import { ListGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/list-gatilho.repository";
import { CreateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/create-gatilho.repository";
import { UpdateGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/update-gatilho.repository";
import { DeleteGatilhoRepositoryContract } from "@/core/gatilho/data/contracts/delete-gatilho.repository";

import { ListTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/list-tipo-entrada.repository";
import { CreateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/create-tipo-entrada.repository";
import { UpdateTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/update-tipo-entrada.repository";
import { DeleteTipoEntradaRepositoryContract } from "@/core/tipo-entrada/data/contracts/delete-tipo-entrada.repository";

//implementations
import { ManageSetupInMemoryRepository } from "@/core/setup/infra/repositories/manage-setup-in-memory.repository";
import { ManageGatilhoInMemoryRepository } from "@/core/gatilho/infra/repositories/manage-gatilho-in-memory.repository";
import { ManageTipoEntradaInMemoryRepository } from "@/core/tipo-entrada/infra/repositories/manage-tipo-entrada-in-memory.repository";
import { ManageTradeInMemoryRepository } from "@/core/trade/infra/repositories/manage-trade-in-memory.repository";
import { ListTradeRepositoryContract } from "@/core/trade/data/contracts/list-trade.repository";
import { CreateTradeRepositoryContract } from "@/core/trade/data/contracts/create-trade.repository";
import { UpdateTradeRepositoryContract } from "@/core/trade/data/contracts/update-trade.repository";
import { DeleteTradeRepositoryContract } from "@/core/trade/data/contracts/delete-trade.repository";
import { ListAtivoRepositoryContract } from "@/core/ativo/data/contracts/list-ativo.repository";
import { ListTimeFrameRepositoryContract } from "@/core/time-frame/data/contracts/list-time-frame.repository";
import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { ManageCampoCustomizavelInMemoryRepository } from "@/core/campo-customizavel/infra/repositories/manage-campo-customizavel-in-memory.repository";
import { ManageAtivoInMemoryRepository } from "@/core/ativo/infra/repositories/manage-ativo-in-memory.repository";
import { ManageTimeFrameInMemoryRepository } from "@/core/time-frame/infra/repositories/manage-time-frame-in-memory.repository";

export class RepositoryServiceProvider implements ServiceProviderContract {
  register(container: ContainerContract): void {
    const manageSetupRepository = new ManageSetupInMemoryRepository();
    container.instance<ListSetupRepositoryContract>(TYPES.ListSetupRepositoryContract, manageSetupRepository);
    container.instance<CreateSetupRepositoryContract>(TYPES.CreateSetupRepositoryContract, manageSetupRepository);
    container.instance<UpdateSetupRepositoryContract>(TYPES.UpdateSetupRepositoryContract, manageSetupRepository);
    container.instance<DeleteSetupRepositoryContract>(TYPES.DeleteSetupRepositoryContract, manageSetupRepository);

    const manageGatilhoRepository = new ManageGatilhoInMemoryRepository();
    container.instance<ListGatilhoRepositoryContract>(TYPES.ListGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<CreateGatilhoRepositoryContract>(TYPES.CreateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<UpdateGatilhoRepositoryContract>(TYPES.UpdateGatilhoRepositoryContract, manageGatilhoRepository);
    container.instance<DeleteGatilhoRepositoryContract>(TYPES.DeleteGatilhoRepositoryContract, manageGatilhoRepository);

    const manageTipoEntradaRepository = new ManageTipoEntradaInMemoryRepository();
    container.instance<ListTipoEntradaRepositoryContract>(
      TYPES.ListTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<CreateTipoEntradaRepositoryContract>(
      TYPES.CreateTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<UpdateTipoEntradaRepositoryContract>(
      TYPES.UpdateTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );
    container.instance<DeleteTipoEntradaRepositoryContract>(
      TYPES.DeleteTipoEntradaRepositoryContract,
      manageTipoEntradaRepository
    );

    const manageTradeRepository = new ManageTradeInMemoryRepository();
    container.instance<ListTradeRepositoryContract>(TYPES.ListTradeRepositoryContract, manageTradeRepository);
    container.instance<CreateTradeRepositoryContract>(TYPES.CreateTradeRepositoryContract, manageTradeRepository);
    container.instance<UpdateTradeRepositoryContract>(TYPES.UpdateTradeRepositoryContract, manageTradeRepository);
    container.instance<DeleteTradeRepositoryContract>(TYPES.DeleteTradeRepositoryContract, manageTradeRepository);

    const manageAtivoRepository = new ManageAtivoInMemoryRepository();
    container.instance<ListAtivoRepositoryContract>(TYPES.ListAtivoRepositoryContract, manageAtivoRepository);

    const manageTimeFrameRepository = new ManageTimeFrameInMemoryRepository();
    container.instance<ListTimeFrameRepositoryContract>(
      TYPES.ListTimeFrameRepositoryContract,
      manageTimeFrameRepository
    );

    const manageCampoCustomizavelRepository = new ManageCampoCustomizavelInMemoryRepository();
    container.instance<ListCampoCustomizavelRepositoryContract>(
      TYPES.ListCampoCustomizavelRepositoryContract,
      manageCampoCustomizavelRepository
    );
  }
}
