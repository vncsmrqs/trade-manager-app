import { ActionResult } from "@/core/common/domain/action-result";
import { CampoCustomizavelEntity } from "@/core/campo-customizavel/domain/entities/campo-customizavel.entity";

export interface ListCampoCustomizavelRepositoryContract {
  list(
    params: ListCampoCustomizavelRepositoryContract.Params
  ): Promise<ActionResult<ListCampoCustomizavelRepositoryContract.Response, string>>
}

export namespace ListCampoCustomizavelRepositoryContract {
  export type Params = {
    search?: string;
    page?: number;
    itemsPerPage?: number;
  }

  export type Response = {
    items: CampoCustomizavelEntity[];
    page: number;
    pageCount: number;
  }
}
