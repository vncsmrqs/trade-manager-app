import { ActionResult } from "@/core/common/domain/action-result";
import { ListImportacaoRepositoryContract } from "@/core/importacao/data/contracts/list-importacao.repository";
import { ListImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/list-importacao.use-case";

export class ListImportacaoUseCase implements ListImportacaoUseCaseContract {
  constructor(
    private listImportacaoRepository: ListImportacaoRepositoryContract
  ) {}

  async execute(
    params: ListImportacaoRepositoryContract.Params
  ): Promise<ActionResult<ListImportacaoUseCaseContract.Response, string>> {
    return this.listImportacaoRepository.list(params);
  }
}
