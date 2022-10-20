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

  public static createFromRaw(raw: any): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      initials: raw.initials,
      lastname: raw.lastname,
      email: raw.email,
      imageUrl: raw.imageUrl,
    });
  }
}
