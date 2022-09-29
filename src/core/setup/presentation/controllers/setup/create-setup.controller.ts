import { Controller } from "@/core/setup/presentation/controllers/common/controller";
import { CreateSetupState, initialCreateSetupState } from "@/core/setup/presentation/states/create-setup.state";
import { CreateSetupUseCaseContract } from "@/core/setup/domain/use-cases/setup/create-setup.use-case";
import { SetupViewController } from "@/core/setup/presentation/controllers/setup/setup-view.controller";
import { initialSetupViewState } from "@/core/setup/presentation/states/setup-view.state";

export class CreateSetupController extends Controller<CreateSetupState> {
  constructor(
    private createSetupUseCase: CreateSetupUseCaseContract,
    private setupViewController: SetupViewController,
  ) {
    super(initialCreateSetupState);
  }

  public async createSetup(name: string) {
    this.changeState({
      kind: "SavingSetupState",
      formDisabled: true,
    });

    try {
      const result = await this.createSetupUseCase.execute({ name });
      if (result.successful) {
        this.changeState({
          kind: "CreatedSetupState",
          setupCreated: result.value,
        });
        this.setupViewController.loadSetupList();
        return;
      }
      this.changeState({
        kind: "ErrorCreateSetupState",
        error: result.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorCreateSetupState",
        error: 'Algum erro inesperado aconteceu!',
      });
    }
  }

  resetState() {
    this.changeState(initialCreateSetupState);
  }
}
