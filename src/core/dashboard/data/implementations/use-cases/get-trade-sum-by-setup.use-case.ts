import { ActionResult } from "@/core/common/domain/action-result";
import {
  GetTradeSumBySetupUseCaseContract,
} from "@/core/dashboard/domain/use-cases/get-trade-sum-by-setup.use-case";
import { GetTradeSumBySetupRepositoryContract } from "@/core/dashboard/data/contracts/get-trade-sum-by-setup.respository";

export class GetTradeSumBySetupUseCase implements GetTradeSumBySetupUseCaseContract {
  constructor(
    private getTradeSumBySetupRepository: GetTradeSumBySetupRepositoryContract
  ) {}
  execute(
    params: GetTradeSumBySetupUseCaseContract.Params
  ): Promise<ActionResult<GetTradeSumBySetupUseCaseContract.Response, string>> {
    return this.getTradeSumBySetupRepository.getTradeSumBySetup(params);
  }
}
