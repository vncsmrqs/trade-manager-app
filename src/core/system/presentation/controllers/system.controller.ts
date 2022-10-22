import { Controller } from "@/core/common/domain/controller";
import { initialSystemState, SystemState } from "@/core/system/presentation/states/system.state";

export class SystemController extends Controller<SystemState> {
  constructor() {
    super(initialSystemState);
  }

  public updatePageTitle(pageTitle: string) {
    this.changeState({
      ...this.state,
      kind: "UpdatedSystemState",
      pageTitle,
      appTitle: `${pageTitle} - Trade Manager`,
    });
  }

  public toggleNavigationDrawer() {
    this.changeState({
      ...this.state,
      kind: "UpdatedSystemState",
      navigationDrawer: !this.state.navigationDrawer,
    });
  }
}
