import { Controller } from "@/core/common/domain/controller";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/list-setup.use-case";
import {
  initialListSetupState,
  LoadedListSetupState,
  ListSetupState
} from "@/core/setup/presentation/states/list-setup.state";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/update-setup.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class ListSetupController extends Controller<ListSetupState> {
  constructor(
    private getSetupListUseCase: ListSetupUseCaseContract,
    private updateSetup: UpdateSetupUseCaseContract,
    private notificationController: NotificationController,
  ) {
    super(initialListSetupState);
  }

  public resetState() {
    this.changeState(initialListSetupState);
  }

  public loadSetupList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListSetupState",
      search,
    });
    this.getSetupListUseCase
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
          kind: "ErrorListSetupState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListSetupState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListSetupUseCaseContract.Response): ListSetupState {
    return {
      ...this.state,
      kind: "LoadedListSetupState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadSetupList(this.state.search, page);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedListSetupState',
      items: this.state.items.map((setup) => {
        if (setup.id === id) setup.ativo = value;
        return setup;
      }),
    });
    try {
      const result = await this.updateSetup.execute({ id, ativo: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
        timeout: 10000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } setup`,
        timeout: 10000,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListSetupState',
      items: this.state.items.map((setup) => {
        if (setup.id === id) {
          setup.ativo = !value;
        }
        return setup;
      }),
    });
  }
}
