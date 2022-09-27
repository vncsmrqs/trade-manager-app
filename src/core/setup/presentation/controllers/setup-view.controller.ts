import { Controller } from "@/core/setup/presentation/controllers/common/controller";
import { initialState, SetupListState } from "@/core/setup/presentation/states/setup-list.state";
import { SetupEntity } from "@/core/setup/domain/entities/setup.entity";
import { ListSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/list-setup.use-case";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";

export class SetupViewController extends Controller<SetupListState> {
  constructor(
    private getSetupListUseCase: ListSetupUseCaseContract,
    private createSetupUseCase: CreateSetupUseCaseContract,
  ) {
    super(initialState);
    this.loadSetupList();
  }

  public createSetup(name: string) {
    this.createSetupUseCase
      .execute({ name })
      .then((result) => {
        if (result.successful) {
          this.loadSetupList();
          return;
        }
        this.changeState({
          kind: "ErrorSetupListState",
          error: result.error.message,
          ready: this.state.ready,
        });
      })
      .catch((error: Error) => {
        this.changeState({
          kind: "ErrorSetupListState",
          error: error.message,
          ready: this.state.ready,
        });
      });
  }

  private loadSetupList() {
    this.getSetupListUseCase
      .execute({})
      .then((result) => {
        if (result.successful) {
          this.changeState(this.mapToUpdatedState(result.value));
          return;
        }
        this.changeState({
          kind: "ErrorSetupListState",
          error: result.error.message,
          ready: this.state.ready,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorSetupListState",
            error: error.message,
            ready: this.state.ready,
          });
      });
  }

  private mapToUpdatedState(setupList: SetupEntity[]): SetupListState {
    return {
      kind: "UpdatedSetupListState",
      page: 0,
      ready: this.state.ready,
      items: setupList,
    };
  }
}
