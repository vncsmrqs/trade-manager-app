export type SetupEntityProps = {
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
}
