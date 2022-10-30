import { Controller } from "@/core/common/domain/controller";
import { AuthState, initialAuthState } from "@/core/auth/presentation/states/auth.state";
import { LoginUseCaseContract } from "@/core/auth/domain/use-cases/login.use-case";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";

export class AuthController extends Controller<AuthState> {
  constructor(
    private loginUseCase: LoginUseCaseContract,
    private getCurrentUserUseCase: GetCurrentUserUseCaseContract
  ) {
    super(initialAuthState);
  }

  public get isAuthenticated(): boolean {
    return !!this.state.token;
  }

  public get isLoadingSession(): boolean {
    return this.state.kind === "LoadingAuthState";
  }

  public async login(email: string, password: string) {
    this.changeState({
      kind: "LoadingAuthState",
      user: undefined,
      token: undefined,
      error: undefined,
    });

    try {
      const loginResult = await this.loginUseCase.execute({ email, password });

      if (loginResult.successful) {
        await this.getCurrentUser(loginResult.value.token);
        AuthController.saveSession(loginResult.value.token);
        return;
      }

      this.changeState({
        kind: "ErrorAuthState",
        error: loginResult.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorAuthState",
        user: undefined,
        token: undefined,
        error: 'Algo inesperado aconteceu durante o login. Por favor, tente novamente.',
      });
    }
  }

  public async getCurrentUser(token?: string): Promise<void> {
    try {
      const currentToken = token || this.state.token;

      if (!currentToken || !currentToken.length) {
        this.changeState({
          kind: "ErrorAuthState",
          user: undefined,
          token: undefined,
          error: "Você não está autenticado.",
        });
        return;
      }

      this.changeState({
        kind: "LoadingAuthState",
        user: undefined,
        error: undefined,
      });

      const getCurrentUserResult = await this.getCurrentUserUseCase.execute({
        token: currentToken,
      });

      if (getCurrentUserResult.successful) {
        this.changeState({
          kind: "LoggedInAuthState",
          user: getCurrentUserResult.value.user,
          token: currentToken,
        });
        return;
      }

      this.changeState({
        kind: "ErrorAuthState",
        user: undefined,
        token: undefined,
        error: getCurrentUserResult.error,
      });
    } catch (error: any) {
      this.changeState({
        kind: "ErrorAuthState",
        user: undefined,
        token: undefined,
        error: 'Algo inesperado aconteceu durante a authenticação.',
      });
    }

    AuthController.removeSession();
  }

  public async loadSession(): Promise<void> {
    if (this.state.getCurrentUserLoader) {
      return this.state.getCurrentUserLoader;
    }

    const promise = new Promise<void>((resolve) => {
      if (this.isAuthenticated) {
        resolve();
        return;
      }

      const token = localStorage.getItem('token');

      if (token) {
        this.getCurrentUser(token).finally(() => resolve());
        return;
      }

      resolve();
    });

    this.changeState({
      getCurrentUserLoader: promise,
    });

    promise.then(() => {
      this.changeState({
        getCurrentUserLoader: undefined,
      });
    });

    return promise;
  }

  private static saveSession(token: string): void{
    localStorage.setItem('token', token);
  }

  private static removeSession() {
    localStorage.removeItem('token');
  }

  public userCan(abilities: string[]): boolean {
    if (!abilities || !abilities.length) return true;
    if (!this.isAuthenticated) return false;
    return !!this.state?.user?.roles.includes('admin');
  }

  public logout() {
    this.resetState();
    AuthController.removeSession();
  }

  public resetState() {
    this.changeState(initialAuthState);
  }
}
