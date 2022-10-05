import { ActionResult } from "@/core/common/domain/action-result";
import { ListCampoCustomizavelRepositoryContract } from "@/core/campo-customizavel/data/contracts/list-campo-customizavel.repository";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";

export class ListCampoCustomizavelUseCase implements ListCampoCustomizavelUseCaseContract {
  constructor(
    private listCampoCustomizavelRepository: ListCampoCustomizavelRepositoryContract
  ) {}

  async execute(
    params: ListCampoCustomizavelRepositoryContract.Params
  ): Promise<ActionResult<ListCampoCustomizavelUseCaseContract.Response, string>> {
    return this.listCampoCustomizavelRepository.list(params);
  }
}
