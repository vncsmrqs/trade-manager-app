import { Controller } from "@/core/common/domain/controller";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
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

  public loadSetupList(filter?: ListSetupUseCaseContract.Params) {
    this.changeState({
      kind: "LoadingSetupViewState",
    });
    this.getSetupListUseCase
      .execute(filter)
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

  private mapToUpdatedState(setupList: SetupEntity[]): LoadedSetupViewState {
    return {
      kind: "LoadedSetupViewState",
      page: 0,
      pageCount: 10,
      items: setupList,
    };
  }

  public async goToPage(page: number): Promise<void> {
    this.changeState({
      kind: "LoadingSetupViewState",
    });
    setTimeout(() => {
      this.changeState({
        kind: "LoadedSetupViewState",
        page,
      });
    }, 3000);
  }

  public async changeAtivo(id: string, value: boolean): Promise<void> {
    try {
      const result = await this.updateSetup.execute({ id, active: value });
      if (result.successful) {
        this.changeState({
          ...this.state,
          kind: 'LoadedSetupViewState',
          items: this.state.items?.map((setup) => {
            if (setup.id === id) {
              setup.id = id;
            }
            return setup;
          }),
        });
        return;
      }
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
  }
}
