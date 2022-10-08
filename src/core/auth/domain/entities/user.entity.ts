export type UserEntityProps = {
  id: string
  name: string;
  initials: string;
  lastname: string;
  email: string;
  imageUrl?: string;
};

export class UserEntity {
  constructor(
    private props: UserEntityProps
  ) {
  }
}
