import { ActionResult } from "@/core/common/domain/action-result";
import { ListTimeFrameRepositoryContract } from "@/core/time-frame/data/contracts/list-time-frame.repository";
import { ListTimeFrameUseCaseContract } from "@/core/time-frame/domain/use-cases/list-time-frame.use-case";

export class ListTimeFrameUseCase implements ListTimeFrameUseCaseContract {
  constructor(
    private listTimeFrameRepository: ListTimeFrameRepositoryContract
  ) {}

  async execute(
    params: ListTimeFrameRepositoryContract.Params
  ): Promise<ActionResult<ListTimeFrameUseCaseContract.Response, string>> {
    return this.listTimeFrameRepository.list(params);
  }
}
