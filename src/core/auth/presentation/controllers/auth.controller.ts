import { Controller } from "@/core/common/domain/controller";
import { AuthState, initialAuthState } from "@/core/auth/presentation/states/auth.state";
import { v4 as uuid } from "uuid";

export class AuthController extends Controller<AuthState> {
  constructor() {
    super(initialAuthState);
  }

  public async login() {
    this.changeState({
      ...this.state,
      kind: "LoggedInAuthState",
      user: {
        id: uuid(),
        name: 'Vinicius',
        initials: 'VM',
        lastname: 'Marques',
        email: 'vncsmrqs',
        imageUrl: 'https://randomuser.me/api/portraits/women/81.jpg',
      },
    });
  }
}
