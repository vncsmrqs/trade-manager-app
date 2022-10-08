import { Controller } from "@/core/common/domain/controller";
import { AuthState, initialAuthState } from "@/core/auth/presentation/states/auth.state";
import { v4 as uuid } from "uuid";

export class AuthController extends Controller<AuthState> {
  constructor() {
    super(initialAuthState);
    this.loadSession();
  }

  public get isAuthenticated(): boolean {
    return !!this.state.token;
  }

  public async login(email: string, password: string) {
    const user = {
      id: uuid(),
      name: 'Vinicius',
      initials: 'VM',
      lastname: 'Marques',
      email,
      imageUrl: 'https://randomuser.me/api/portraits/women/81.jpg',
    };
    const token = JSON.stringify(user);
    this.changeState({
      kind: "LoggedInAuthState",
      user,
      token,
    });
    this.saveSession(token);
  }

  public async getUser(): Promise<void> {
    if (this.state.token) {
      this.changeState({
        kind: "LoggedInAuthState",
        user: JSON.parse(this.state.token),
      });
    }
  }

  private loadSession(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.changeState({ token });
      this.getUser().finally(() => console.log());
    }
  }

  private saveSession(token: string): void{
    localStorage.setItem('token', token);
  }

  private removeSession() {
    localStorage.removeItem('token');
  }

  public logout() {
    this.removeSession();
    this.resetState();
  }

  public resetState() {
    this.changeState(initialAuthState);
  }
}
