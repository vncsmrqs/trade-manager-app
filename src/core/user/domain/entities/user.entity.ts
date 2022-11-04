import DateUtils from "@/common/date.utils";

export type UserEntityProps = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  lastAccess?: string;
  tradeCount: number;
  accessDeadline?: string;
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

  get lastAccessFormatted(): string {
    return this.props.lastAccess
      ? DateUtils.formatDatetimeFieldValue(this.props.lastAccess)
      : '-';
  }

  get accessDeadline(): string | undefined {
    return this.props.accessDeadline;
  }

  get accessDeadlineFormatted(): string {
    return this.props.accessDeadline
      ? DateUtils.formatDateFieldValue(this.props.accessDeadline)
      : '-';
  }

  get tradeCount(): number {
    return this.props.tradeCount;
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
      lastAccess: raw.last_access,
      tradeCount: raw.trade_count,
      accessDeadline: raw.access_deadline,
    });
  }
}
