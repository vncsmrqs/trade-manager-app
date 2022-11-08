import { ListUserRepositoryContract } from "@/core/user/data/contracts/list-user.repository";
import { UserEntity } from "@/core/user/domain/entities/user.entity";
import { ActionResult } from "@/core/common/domain/action-result";
import { CreateUserRepositoryContract } from "@/core/user/data/contracts/create-user.repository";
import { UpdateUserRepositoryContract } from "@/core/user/data/contracts/update-user.repository";
import { DeleteUserRepositoryContract } from "@/core/user/data/contracts/delete-user.repository";
import { HttpClient } from "@/core/common/domain/http-client";
import { ResetUserPasswordRepositoryContract } from "@/core/user/data/contracts/reset-user-password.repository";

type ListUserRequest = {
  search?: string;
  page?: number;
  items_per_page?: number;
  active?: boolean;
};

type ListUserResponse = {
  data: Record<string, any>[];
  meta: {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number,
  },
};

type CreateUserRequest = {
  name: string;
  lastname: string;
  email: string;
  image_path?: string;
  access_deadline?: string;
  active: boolean;
};

type CreateOrUpdateUserResponse = {
  message: string;
};

type UpdateUserRequest = {
  name?: string;
  lastname?: string;
  image_path?: string;
  access_deadline?: string;
  active?: boolean;
};

export class ManageUserApiRepository extends HttpClient implements
  ListUserRepositoryContract,
  CreateUserRepositoryContract,
  UpdateUserRepositoryContract,
  DeleteUserRepositoryContract,
  ResetUserPasswordRepositoryContract
{
  constructor(baseUrl: string) {
    super(baseUrl);
  }
  async list(
    params: ListUserRepositoryContract.Params
  ): Promise<ActionResult<ListUserRepositoryContract.Response, any>> {
    try {
      const requestParams: ListUserRequest = {
        search: params.search,
        page: params.page,
        items_per_page: params.itemsPerPage,
        active: params.active,
      };

      const { data, meta } = await this.client.get<ListUserResponse>('/admin/users', {
        params: requestParams,
      });

      return ActionResult.success({
        items: data.map((user) => UserEntity.createFromRaw(user)),
        page: meta.current_page,
        pageCount: meta.last_page,
      });
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async create(params: CreateUserRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: CreateUserRequest = {
        name: params.name,
        lastname: params.lastname,
        email: params.email,
        access_deadline: params.accessDeadline,
        image_path: params.imagePath,
        active: params.active,
      };

      await this.client.post<CreateOrUpdateUserResponse>('/admin/users', requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async update(params: UpdateUserRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      const requestBody: UpdateUserRequest = {
        name: params.name,
        lastname: params.lastname,
        image_path: params.imagePath,
        access_deadline: params.accessDeadline,
        active: params.active,
      };

      await this.client.put<CreateOrUpdateUserResponse>(`/admin/users/${params.id}`, requestBody);

      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para alterar esse usuário');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async delete(params: DeleteUserRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.delete<void>(`/admin/users/${params.id}`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para excluir esse usuário');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }

  async resetUserPassword(params: ResetUserPasswordRepositoryContract.Params): Promise<ActionResult<void, string>> {
    try {
      await this.client.post<void>(`/admin/users/${params.id}/reset-password`);
      return ActionResult.success();
    }
    catch (error: any) {
      if (error.status === 401) {
        return ActionResult.failure('Você não está autenticado');
      }
      if (error.status === 403) {
        return ActionResult.failure('Você não tem permissão para redefinir a senha desse usuário');
      }
      return ActionResult.failure('Algo inesperado aconteceu. Por favor, tente novamente.');
    }
  }
}
