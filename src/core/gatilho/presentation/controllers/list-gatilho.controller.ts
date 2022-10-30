import { Controller } from "@/core/common/domain/controller";
import { ListGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/list-gatilho.use-case";
import {
  initialListGatilhoState,
  LoadedListGatilhoState,
  ListGatilhoState
} from "@/core/gatilho/presentation/states/list-gatilho.state";
import { UpdateGatilhoUseCaseContract } from "@/core/gatilho/domain/use-cases/update-gatilho.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class ListGatilhoController extends Controller<ListGatilhoState> {
  constructor(
    private getGatilhoListUseCase: ListGatilhoUseCaseContract,
    private updateGatilho: UpdateGatilhoUseCaseContract,
    private notificationController: NotificationController,
  ) {
    super(initialListGatilhoState);
  }

  public resetState() {
    this.changeState(initialListGatilhoState);
  }

  public loadGatilhoList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListGatilhoState",
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
          kind: "ErrorListGatilhoState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListGatilhoState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListGatilhoUseCaseContract.Response): ListGatilhoState {
    return {
      ...this.state,
      kind: "LoadedListGatilhoState",
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
      kind: 'LoadedListGatilhoState',
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
        timeout: 10000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } gatilho`,
        timeout: 10000,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListGatilhoState',
      items: this.state.items.map((gatilho) => {
        if (gatilho.id === id) {
          gatilho.ativo = !value;
        }
        return gatilho;
      }),
    });
  }
}
