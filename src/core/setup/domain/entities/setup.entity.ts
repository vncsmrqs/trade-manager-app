export type SetupEntityProps = {
  name: string;
  createdAt: string;
  description: string;
  userId: string;
  active: boolean;
}

export class SetupEntity {
  private props: SetupEntityProps;

  constructor(props: SetupEntityProps) {
    this.props = props;
  }
}
