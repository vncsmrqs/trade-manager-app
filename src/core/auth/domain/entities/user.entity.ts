export type UserEntityProps = {
  id: string
  name: string;
  initials: string;
  lastname: string;
  email: string;
  imageUrl?: string;
  imagePath?: string;
  roles: string[];
};

export class UserEntity {
  constructor(
    private props: UserEntityProps
  ) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get initials(): string {
    return this.props.initials;
  }

  get lastname(): string {
    return this.props.lastname;
  }

  get email(): string {
    return this.props.email;
  }

  get roles(): string[] {
    return this.props.roles;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get imagePath():  string | undefined {
    return this.props.imagePath;
  }

  public static createFromRaw(raw: any): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      initials: raw.initials,
      lastname: raw.lastname,
      email: raw.email,
      imageUrl: raw.image_url,
      imagePath: raw.image_path,
      roles: raw.user_roles,
    });
  }
}
