import { ActionResult } from "@/core/common/domain/action-result";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";

export interface ListSetupRepositoryContract {
  list(): Promise<ActionResult<SetupEntity[], any>>
}
