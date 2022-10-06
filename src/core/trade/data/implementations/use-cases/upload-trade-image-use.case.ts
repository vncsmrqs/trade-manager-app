import { ActionResult } from "@/core/common/domain/action-result";
import { UploadTradeImageRepositoryContract } from "@/core/trade/data/contracts/upload-image-trade.repository";
import { UploadTradeImageUseCaseContract } from "@/core/trade/domain/use-cases/upload-trade-image.use-case";

const fileTypesAcceptable = [
  "image/png",
  "image/jpeg",
  "image/jpg",
];

const maxFileSize = 1024 * 1024 * 4; //5MB

export class UploadTradeImageUseCase implements UploadTradeImageUseCaseContract {
  constructor(
    private uploadTradeImageRepository: UploadTradeImageRepositoryContract
  ) {}

  async execute(
    params: UploadTradeImageUseCaseContract.Params
  ): Promise<ActionResult<UploadTradeImageUseCaseContract.Response, string>> {

    if (!fileTypesAcceptable.includes(params.image.type)) {
      return ActionResult.failure('Tipo de arquivo não suportado!');
    }

    if (params.image.size > maxFileSize) {
      return ActionResult.failure('Tamanho máximo do arquivo excedido!');
    }

    return this.uploadTradeImageRepository.uploadImage(params);
  }
}
