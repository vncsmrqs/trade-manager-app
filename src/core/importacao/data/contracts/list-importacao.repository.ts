import { ActionResult } from "@/core/common/domain/action-result";
import { ListImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/list-importacao.use-case";

export interface ListImportacaoRepositoryContract {
  list(
    params: ListImportacaoRepositoryContract.Params
  ): Promise<ActionResult<ListImportacaoRepositoryContract.Response, string>>
}

export namespace ListImportacaoRepositoryContract {
  export type Params = ListImportacaoUseCaseContract.Params;
  export type Response = ListImportacaoUseCaseContract.Response;
}
