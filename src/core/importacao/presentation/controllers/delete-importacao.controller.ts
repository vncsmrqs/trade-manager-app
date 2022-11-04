import { Controller } from "@/core/common/domain/controller";
import { DeleteImportacaoUseCaseContract } from "@/core/importacao/domain/use-cases/delete-importacao.use-case";
import { DeleteImportacaoState, initialDeleteImportacaoState } from "@/core/importacao/presentation/states/delete-importacao.state";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListImportacaoController } from "@/core/importacao/presentation/controllers/list-importacao.controller";

export class DeleteImportacaoController extends Controller<DeleteImportacaoState> {
  constructor(
    private deleteImportacaoUseCase: DeleteImportacaoUseCaseContract,
    private listImportacaoController: ListImportacaoController,
    private notificationController: NotificationController,
  ) {
    super(initialDeleteImportacaoState);
  }

  public async deleteImportacao(id: string) {
    this.changeState({
      kind: "DeletingImportacaoState",
    });

    try {
      const result = await this.deleteImportacaoUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedImportacaoState",
        });
        this.notificationController.push({
          type: 'success',
          message: 'Importação excluida com sucesso!',
          timeout: 3000,
        });
        this.listImportacaoController.loadImportacaoList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteImportacaoState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteImportacaoState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteImportacaoState);
  }
}
