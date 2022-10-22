import { ActionResult } from "@/core/common/domain/action-result";

export interface UpdateLocalStopRepositoryContract {
  update(params: UpdateLocalStopRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateLocalStopRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
