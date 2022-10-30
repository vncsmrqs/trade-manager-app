import { Controller } from "@/core/common/domain/controller";
import { ListTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/list-tipo-stop.use-case";
import {
  initialListTipoStopState,
  LoadedListTipoStopState,
  ListTipoStopState
} from "@/core/tipo-stop/presentation/states/list-tipo-stop.state";
import { UpdateTipoStopUseCaseContract } from "@/core/tipo-stop/domain/use-cases/update-tipo-stop.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { TipoStopEntity } from "@/core/tipo-stop/domain/entities/tipo-stop.entity";

export class ListTipoStopController extends Controller<ListTipoStopState> {
  constructor(
    private getTipoStopListUseCase: ListTipoStopUseCaseContract,
    private updateTipoStop: UpdateTipoStopUseCaseContract,
  ) {
    super(initialListTipoStopState);
  }

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  public resetState() {
    this.changeState(initialListTipoStopState);
  }

  public loadTipoStopList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListTipoStopState",
      search,
    });
    this.getTipoStopListUseCase
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
          kind: "ErrorListTipoStopState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListTipoStopState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListTipoStopUseCaseContract.Response): ListTipoStopState {
    return {
      ...this.state,
      kind: "LoadedListTipoStopState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadTipoStopList(this.state.search, page);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedListTipoStopState',
      items: this.state.items.map((tipoStop: TipoStopEntity) => {
        if (tipoStop.id === id) tipoStop.ativo = value;
        return tipoStop;
      }),
    });
    try {
      const result = await this.updateTipoStop.execute({ id, ativo: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
        timeout: 10000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } tipo de stop`,
        timeout: 10000,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListTipoStopState',
      items: this.state.items.map((tipoStop: TipoStopEntity) => {
        if (tipoStop.id === id) {
          tipoStop.ativo = !value;
        }
        return tipoStop;
      }),
    });
  }
}
