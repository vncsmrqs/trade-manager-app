import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateGatilhoRepositoryContract {
  update(params: UpdateGatilhoRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateGatilhoRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
