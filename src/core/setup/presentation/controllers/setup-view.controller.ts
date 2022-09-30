import { Controller } from "@/core/common/domain/controller";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import {
  initialSetupViewState,
  LoadedSetupViewState,
  SetupViewState
} from "@/core/setup/presentation/states/setup-view.state";
import { UpdateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/update-setup.use-case";
import { app, TYPES } from "@/core/common/container";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class SetupViewController extends Controller<SetupViewState> {
  constructor(
    private getSetupListUseCase: ListSetupUseCaseContract,
    private updateSetup: UpdateSetupUseCaseContract,
  ) {
    super(initialSetupViewState);
  }

  private notificationController = app.make<NotificationController>(TYPES.NotificationController);

  public resetState() {
    this.changeState(initialSetupViewState);
  }

  public loadSetupList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingSetupViewState",
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
          kind: "ErrorSetupViewState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorSetupViewState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListSetupUseCaseContract.Response): LoadedSetupViewState {
    return {
      kind: "LoadedSetupViewState",
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
      kind: 'LoadedSetupViewState',
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
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Um erro inesperado ao ${ value ? 'ativar' : 'desativar' } do setup`,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedSetupViewState',
      items: this.state.items.map((setup) => {
        if (setup.id === id) {
          setup.ativo = !value;
        }
        return setup;
      }),
    });
  }
}
