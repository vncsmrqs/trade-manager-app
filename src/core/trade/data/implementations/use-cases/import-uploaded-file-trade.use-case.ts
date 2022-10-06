import { ActionResult } from "@/core/common/domain/action-result";
import { ImportUploadedFileTradeUseCaseContract } from "@/core/trade/domain/use-cases/import-uploaded-file-trade.use-case";
import { ImportUploadedFileTradeRepositoryContract } from "@/core/trade/data/contracts/import-uploaded-file-trade.repository";

export class ImportUploadedFileTradeUseCase implements ImportUploadedFileTradeUseCaseContract {
  constructor(
    private importUploadedFileTradeRepository: ImportUploadedFileTradeRepositoryContract
  ) {}

  async execute(
    params: ImportUploadedFileTradeUseCaseContract.Params
  ): Promise<ActionResult<ImportUploadedFileTradeUseCaseContract.Response, any>> {
    return this.importUploadedFileTradeRepository.importFile(params);
  }
}
