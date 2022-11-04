import { ActionResult } from "@/core/common/domain/action-result";
import { ImportacaoEntity } from "@/core/importacao/domain/entities/importacao.entity";

export interface DeleteImportacaoUseCaseContract {
  execute(params: DeleteImportacaoUseCaseContract.Params): Promise<ActionResult<DeleteImportacaoUseCaseContract.Response, string>>
}

export namespace DeleteImportacaoUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
