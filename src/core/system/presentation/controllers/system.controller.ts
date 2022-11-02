import { Controller } from "@/core/common/domain/controller";
import { initialSystemState, SystemState } from "@/core/system/presentation/states/system.state";

export class SystemController extends Controller<SystemState> {
  constructor() {
    super(initialSystemState);
  }

  get iconSrc(): string {
    return `${process.env.BASE_URL}logo.png`;
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
