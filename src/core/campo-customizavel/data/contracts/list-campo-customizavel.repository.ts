import { ActionResult } from "@/core/common/domain/action-result";
import { ListCampoCustomizavelUseCaseContract } from "@/core/campo-customizavel/domain/use-cases/list-campo-customizavel.use-case";

export interface ListCampoCustomizavelRepositoryContract {
  list(
    params: ListCampoCustomizavelRepositoryContract.Params
  ): Promise<ActionResult<ListCampoCustomizavelRepositoryContract.Response, string>>
}

export namespace ListCampoCustomizavelRepositoryContract {
  export type Params = ListCampoCustomizavelUseCaseContract.Params;
  export type Response = ListCampoCustomizavelUseCaseContract.Response;
}
