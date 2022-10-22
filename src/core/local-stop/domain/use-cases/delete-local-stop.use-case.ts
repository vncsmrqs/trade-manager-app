import { ActionResult } from "@/core/common/domain/action-result";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export interface DeleteLocalStopUseCaseContract {
  execute(params: DeleteLocalStopUseCaseContract.Params): Promise<ActionResult<DeleteLocalStopUseCaseContract.Response, string>>
}

export namespace DeleteLocalStopUseCaseContract {
  export type Params = {
    id: string;
  };
  export type Response = void;
}
