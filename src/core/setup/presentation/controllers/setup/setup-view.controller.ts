import { Controller } from "@/core/setup/presentation/controllers/common/controller";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { initialSetupViewState, SetupViewState } from "@/core/setup/presentation/states/setup-view.state";

export class SetupViewController extends Controller<SetupViewState> {
  constructor(
    private getSetupListUseCase: ListSetupUseCaseContract,
  ) {
    super(initialSetupViewState);
    this.loadSetupList();
  }

  public loadSetupList() {
    this.getSetupListUseCase
      .execute({})
      .then((result) => {
        if (result.successful) {
          this.changeState(this.mapToUpdatedState(result.value));
          return;
        }
        this.changeState({
          kind: "ErrorSetupViewState",
          error: result.error,
          ready: this.state.ready,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorSetupViewState",
            error: error.message,
            ready: this.state.ready,
          });
      });
  }

  private mapToUpdatedState(setupList: SetupEntity[]): SetupViewState {
    return {
      kind: "LoadedSetupViewState",
      page: 0,
      ready: this.state.ready,
      items: setupList,
    };
  }
}
