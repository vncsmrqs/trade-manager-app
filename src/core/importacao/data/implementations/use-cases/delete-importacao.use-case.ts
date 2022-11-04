import { ActionResult } from "@/core/common/domain/action-result";
import { DeleteImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/delete-importacao.use-case";
import { DeleteImportacaoRepositoryContract } from "@/core/importacao/data/contracts/delete-importacao.repository";

export class DeleteImportacaoUseCase implements DeleteImportacaoUseCaseContract {
  constructor(
    private deleteImportacaoRepository: DeleteImportacaoRepositoryContract
  ) {}

  async execute(
    params: DeleteImportacaoUseCaseContract.Params
  ): Promise<ActionResult<DeleteImportacaoUseCaseContract.Response, any>> {
    return this.deleteImportacaoRepository.delete(params);
  }
}
