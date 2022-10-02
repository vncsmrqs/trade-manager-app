import { Controller } from "@/core/common/domain/controller";
import { DeleteTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/delete-tipo-entrada.use-case";
import { DeleteTipoEntradaState, initialDeleteTipoEntradaState } from "@/core/tipo-entrada/presentation/states/delete-tipo-entrada.state";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { ListTipoEntradaController } from "@/core/tipo-entrada/presentation/controllers/list-tipo-entrada.controller";

export class DeleteTipoEntradaController extends Controller<DeleteTipoEntradaState> {
  constructor(
    private deleteTipoEntradaUseCase: DeleteTipoEntradaUseCaseContract,
    private listTipoEntradaController: ListTipoEntradaController,
    private notifierController: NotificationController,
  ) {
    super(initialDeleteTipoEntradaState);
  }


  public async deleteTipoEntrada(id: string) {
    this.changeState({
      kind: "DeletingTipoEntradaState",
    });

    try {
      const result = await this.deleteTipoEntradaUseCase.execute({  id });
      if (result.successful) {
        this.changeState({
          kind: "DeletedTipoEntradaState",
        });
        this.notifierController.push({
          type: 'success',
          message: 'TipoEntrada excluido com sucesso!',
          timeout: 3000,
        });
        this.listTipoEntradaController.loadTipoEntradaList();
        return;
      }
      this.changeState({
        kind: "ErrorDeleteTipoEntradaState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorDeleteTipoEntradaState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialDeleteTipoEntradaState);
  }
}
