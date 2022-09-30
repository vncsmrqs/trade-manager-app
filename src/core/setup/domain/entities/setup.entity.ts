export type SetupEntityProps = {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
  active: boolean;
}

export class SetupEntity {
  private props: SetupEntityProps;

  constructor(props: SetupEntityProps) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get id(): string {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }
}
