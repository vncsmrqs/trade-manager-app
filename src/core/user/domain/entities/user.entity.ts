export type UserEntityProps = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export class UserEntity {
  private props: UserEntityProps;

  constructor(props: UserEntityProps) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get lastname(): string {
    return this.props.lastname;
  }

  get email(): string {
    return this.props.email;
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  get updatedAt(): string {
    return this.props.updatedAt;
  }

  public static createFromRaw(raw: any): UserEntity {
    return new UserEntity({
      id: raw.id,
      name: raw.name,
      lastname: raw.lastname,
      email: raw.email,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
      active: raw.active,
    });
  }
}
