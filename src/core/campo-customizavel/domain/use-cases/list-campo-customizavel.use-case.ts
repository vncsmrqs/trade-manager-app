import { ActionResult } from "@/core/common/domain/action-result";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";

export interface ListCampoCustomizavelUseCaseContract {
  execute(params: ListCampoCustomizavelUseCaseContract.Params): Promise<ActionResult<ListCampoCustomizavelUseCaseContract.Response, string>>
}

export namespace ListCampoCustomizavelUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
    ativo?: boolean;
    contexto?: string;
  }

  export type Response = {
    items: CampoCustomizavelEntity[];
    page: number;
    pageCount: number;
  }
}
