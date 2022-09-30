import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface UpdateSetupRepositoryContract {
  update(params: UpdateSetupRepositoryContract.Params): Promise<ActionResult<void, string>>
}

export namespace UpdateSetupRepositoryContract {
  export type Params = {
    id: string;
    nome?: string;
    ativo?: boolean;
  };
}
