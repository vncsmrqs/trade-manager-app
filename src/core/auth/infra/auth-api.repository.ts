import { LoginRepositoryContract } from "@/core/auth/data/contracts/login.repository";
import { ActionResult } from "@/core/common/domain/action-result";
import { HttpClient } from "@/core/common/domain/http-client";
import { GetCurrentUserRepositoryContract } from "@/core/auth/data/contracts/get-current-user.repository";
import { UserEntity } from "@/core/auth/domain/entities/user.entity";
import { ChangePasswordRepositoryContract } from "@/core/auth/data/contracts/change-password.repository";

export type LoginResponse = {
  access_token: string,
  token_type: string,
};

export type GetCurrentUserResponse = {
  user: Record<string, any>,
};

export class AuthApiRepository extends HttpClient implements
  LoginRepositoryContract,
  GetCurrentUserRepositoryContract,
  ChangePasswordRepositoryContract
{
  constructor(baseURL: string) {
    super(baseURL);
  }

  async login(params: LoginRepositoryContract.Params): Promise<ActionResult<LoginRepositoryContract.Response, string>> {
    try {
      const { access_token, token_type } = await this.client.post<LoginResponse>('/auth/login', params);
      return ActionResult.success({
        token: token_type + ' ' + access_token,
      });
    }
    catch (error: any) {
      if (!error) {
        return ActionResult.failure('Problema na conexão com o servidor. Por favor, tente mais tarde.');
      }
      if ([400, 401].includes(error.status)) {
        return ActionResult.failure(error?.data?.message || 'Credenciais inválidas');
      }
      if (error.status === 403) {
        return ActionResult.failure(error?.data?.message || 'Usuário bloqueado ou data limite de acesso excedida!');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async getCurrentUser(
    params: GetCurrentUserRepositoryContract.Params
  ): Promise<ActionResult<GetCurrentUserRepositoryContract.Response, string>> {
    try {
      const { user } = await this.client.get<GetCurrentUserResponse>('/auth/current-user', {
        headers: {
          'Authorization': params.token,
        },
      });
      return ActionResult.success({
        user: UserEntity.createFromRaw(user),
      });
    }
    catch (error: any) {
      if (!error) {
        return ActionResult.failure('Problema na conexão com o servidor. Por favor, tente mais tarde.');
      }
      if (error.status === 401) {
        return ActionResult.failure('Sua sessão expirou. Por favor, faça o login novamente.');
      }
      if (error.status === 403) {
        return ActionResult.failure(error?.data?.message || 'Usuário bloqueado ou data limite de acesso excedida!');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente em alguns instantes.');
    }
  }

  async changePassword(
    params: ChangePasswordRepositoryContract.Params
  ): Promise<ActionResult<ChangePasswordRepositoryContract.Response, string>> {
    try {
      await this.client.post<void>('/auth/change-password', {
        current_password: params.currentPassword,
        new_password: params.newPassword,
        confirm_new_password: params.confirmNewPassword,
      });
      return ActionResult.success();
    }
    catch (error: any) {
      if (!error) {
        return ActionResult.failure('Problema na conexão com o servidor. Por favor, tente mais tarde.');
      }

      const message = error?.data?.message;

      if (error.status === 400) {
        return ActionResult.failure(message || 'Foi encontrado algum problema no seu formulário. Confira e tente novamente, por favor.');
      }

      if (error.status === 401) {
        return ActionResult.failure('Sua sessão expirou. Por favor, faça o login novamente.');
      }

      if (error.status === 403) {
        return ActionResult.failure(message || 'Você não possúi permissão para realizar essa ação');
      }

      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente em alguns instantes.');
    }
  }
}
