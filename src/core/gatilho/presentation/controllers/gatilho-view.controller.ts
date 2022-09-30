import { Controller } from "@/core/common/domain/controller";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import {
  initialGatilhoViewState,
  LoadedGatilhoViewState,
  GatilhoViewState
} from "@/core/gatilho/presentation/states/gatilho-view.state";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class GatilhoViewController extends Controller<GatilhoViewState> {
  constructor(
    private getGatilhoListUseCase: ListGatilhoUseCaseContract,
    private updateGatilho: UpdateGatilhoUseCaseContract,
  ) {
    super(initialGatilhoViewState);
  }

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  public resetState() {
    this.changeState(initialGatilhoViewState);
  }

  public loadGatilhoList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingGatilhoViewState",
      search,
    });
    this.getGatilhoListUseCase
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
          kind: "ErrorGatilhoViewState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorGatilhoViewState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListGatilhoUseCaseContract.Response): LoadedGatilhoViewState {
    return {
      kind: "LoadedGatilhoViewState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadGatilhoList(this.state.search, page);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedGatilhoViewState',
      items: this.state.items.map((gatilho) => {
        if (gatilho.id === id) gatilho.ativo = value;
        return gatilho;
      }),
    });
    try {
      const result = await this.updateGatilho.execute({ id, ativo: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Um erro inesperado ao ${ value ? 'ativar' : 'desativar' } do gatilho`,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedGatilhoViewState',
      items: this.state.items.map((gatilho) => {
        if (gatilho.id === id) {
          gatilho.ativo = !value;
        }
        return gatilho;
      }),
    });
  }
}
