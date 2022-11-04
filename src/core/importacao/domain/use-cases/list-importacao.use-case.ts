import { ActionResult } from "@/core/common/domain/action-result";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";

export interface ListImportacaoUseCaseContract {
  execute(params: ListImportacaoUseCaseContract.Params): Promise<ActionResult<ListImportacaoUseCaseContract.Response, string>>
}

export namespace ListImportacaoUseCaseContract {
  export type Params = {
    search?: string;
    page?: number;
    ativo?: boolean;
    itemsPerPage?: number;
  }

  export type Response = {
    items: ImportacaoEntity[];
    page: number;
    pageCount: number;
  }
}
