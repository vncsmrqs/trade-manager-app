import { Controller } from "@/core/common/domain/controller";
import { ListLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/list-local-stop.use-case";
import {
  initialListLocalStopState,
  LoadedListLocalStopState,
  ListLocalStopState
} from "@/core/local-stop/presentation/states/list-local-stop.state";
import { UpdateLocalStopUseCaseContract } from "@/core/local-stop/domain/use-cases/update-local-stop.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";
import { LocalStopEntity } from "@/core/local-stop/domain/entities/local-stop.entity";

export class ListLocalStopController extends Controller<ListLocalStopState> {
  constructor(
    private getLocalStopListUseCase: ListLocalStopUseCaseContract,
    private updateLocalStop: UpdateLocalStopUseCaseContract,
  ) {
    super(initialListLocalStopState);
  }

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  public resetState() {
    this.changeState(initialListLocalStopState);
  }

  public loadLocalStopList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListLocalStopState",
      search,
    });
    this.getLocalStopListUseCase
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
          kind: "ErrorListLocalStopState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListLocalStopState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListLocalStopUseCaseContract.Response): ListLocalStopState {
    return {
      ...this.state,
      kind: "LoadedListLocalStopState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadLocalStopList(this.state.search, page);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedListLocalStopState',
      items: this.state.items.map((localStop: LocalStopEntity) => {
        if (localStop.id === id) localStop.ativo = value;
        return localStop;
      }),
    });
    try {
      const result = await this.updateLocalStop.execute({ id, ativo: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
        timeout: 1000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } local do stop`,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListLocalStopState',
      items: this.state.items.map((localStop: LocalStopEntity) => {
        if (localStop.id === id) {
          localStop.ativo = !value;
        }
        return localStop;
      }),
    });
  }
}
