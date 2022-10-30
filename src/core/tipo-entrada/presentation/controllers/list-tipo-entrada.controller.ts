import { Controller } from "@/core/common/domain/controller";
import { ListTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/list-tipo-entrada.use-case";
import {
  initialListTipoEntradaState,
  LoadedListTipoEntradaState,
  ListTipoEntradaState
} from "@/core/tipo-entrada/presentation/states/list-tipo-entrada.state";
import { UpdateTipoEntradaUseCaseContract } from "@/core/tipo-entrada/domain/use-cases/update-tipo-entrada.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class ListTipoEntradaController extends Controller<ListTipoEntradaState> {
  constructor(
    private getTipoEntradaListUseCase: ListTipoEntradaUseCaseContract,
    private updateTipoEntrada: UpdateTipoEntradaUseCaseContract,
  ) {
    super(initialListTipoEntradaState);
  }

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  public resetState() {
    this.changeState(initialListTipoEntradaState);
  }

  public loadTipoEntradaList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListTipoEntradaState",
      search,
    });
    this.getTipoEntradaListUseCase
      .execute({
        itemsPerPage: this.state.itemsPerPage,
        search,
        page,
      })
      .then((result) => {
        if (result.successful) {
          this.changeState(this.mapToUpdatedState(result.value));
          return;
        }
        this.changeState({
          kind: "ErrorListTipoEntradaState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListTipoEntradaState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListTipoEntradaUseCaseContract.Response): ListTipoEntradaState {
    return {
      ...this.state,
      kind: "LoadedListTipoEntradaState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadTipoEntradaList(this.state.search, page);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedListTipoEntradaState',
      items: this.state.items.map((tipoEntrada) => {
        if (tipoEntrada.id === id) tipoEntrada.ativo = value;
        return tipoEntrada;
      }),
    });
    try {
      const result = await this.updateTipoEntrada.execute({ id, ativo: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
        timeout: 1000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } tipo de entrada`,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListTipoEntradaState',
      items: this.state.items.map((tipoEntrada) => {
        if (tipoEntrada.id === id) {
          tipoEntrada.ativo = !value;
        }
        return tipoEntrada;
      }),
    });
  }
}
