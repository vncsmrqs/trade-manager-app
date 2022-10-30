import { Controller } from "@/core/common/domain/controller";
import { ListUserUseCaseContract } from "@/core/user/domain/use-cases/list-user.use-case";
import {
  initialListUserState,
  LoadedListUserState,
  ListUserState
} from "@/core/user/presentation/states/list-user.state";
import { UpdateUserUseCaseContract } from "@/core/user/domain/use-cases/update-user.use-case";
import { NotificationController } from "@/core/notification/presentation/controllers/notification.controller";

export class ListUserController extends Controller<ListUserState> {
  constructor(
    private getUserListUseCase: ListUserUseCaseContract,
    private updateUser: UpdateUserUseCaseContract,
    private notificationController: NotificationController,
  ) {
    super(initialListUserState);
  }

  public resetState() {
    this.changeState(initialListUserState);
  }

  public loadUserList(search?: string, page?: number) {
    this.changeState({
      kind: "LoadingListUserState",
      search,
    });
    this.getUserListUseCase
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
          kind: "ErrorListUserState",
          error: result.error,
        });
      })
      .catch((error) => {
          this.changeState({
            kind: "ErrorListUserState",
            error: error.message,
          });
      });
  }

  private mapToUpdatedState(response: ListUserUseCaseContract.Response): ListUserState {
    return {
      ...this.state,
      kind: "LoadedListUserState",
      page: response.page,
      pageCount: response.pageCount,
      items: response.items,
    };
  }

  public async goToPage(page: number): Promise<void> {
    return this.loadUserList(this.state.search, page);
  }

  public async changeActive(id: string, value: boolean): Promise<void> {
    this.changeState({
      ...this.state,
      kind: 'LoadedListUserState',
      items: this.state.items.map((user) => {
        if (user.id === id) user.active = value;
        return user;
      }),
    });
    try {
      const result = await this.updateUser.execute({ id, active: value });
      if (result.successful) return;
      this.notificationController.push({
        type: 'error',
        message: result.error,
        timeout: 10000,
      });
    } catch (error) {
      this.notificationController.push({
        type: 'error',
        message: `Algo inesperado ocorreu ao ${ value ? 'ativar' : 'desativar' } usuário`,
        timeout: 10000,
      });
    }
    this.changeState({
      ...this.state,
      kind: 'LoadedListUserState',
      items: this.state.items.map((user) => {
        if (user.id === id) {
          user.active = !value;
        }
        return user;
      }),
    });
  }
}
