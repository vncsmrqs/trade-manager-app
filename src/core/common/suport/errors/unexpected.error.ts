export class UnexpectedError extends Error {
  private readonly _name: string

  constructor(message: string) {
    super(message);
    this._name = this.constructor.name;
  }

  get name(): string {
    return this._name;
  }
}
