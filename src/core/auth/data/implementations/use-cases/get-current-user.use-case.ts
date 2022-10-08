import { ActionResult } from "@/core/common/domain/action-result";
import { UserEntity } from "@/core/auth/domain/entities/user.entity";
import { GetCurrentUserUseCaseContract } from "@/core/auth/domain/use-cases/get-current-user.use-case";

export class GetCurrentUserUseCase implements GetCurrentUserUseCaseContract{
  execute(
    params?: GetCurrentUserUseCaseContract.Params
  ): Promise<ActionResult<GetCurrentUserUseCaseContract.Response, string>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(ActionResult.success({
          user: new UserEntity({
            id: '00000-00000-000000000000-0000000000000',
            name: 'Vinicius',
            initials: 'VM',
            lastname: 'Marques',
            email: 'vncsmrqs@gmail.com',
            imageUrl: 'https://randomuser.me/api/portraits/women/81.jpg',
          }),
        }));
      }, 3000);
    });
  }
}
