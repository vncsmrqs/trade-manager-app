export abstract class Controller<S> {
  private internalState: S;
  private listeners: Subscription<S>[] = [];

  protected constructor(initialState: S) {
    this.internalState = initialState;
  }

  public get state(): S {
    return this.internalState;
  }

  changeState(state: Partial<S>) {
    // console.log('[change-state]', this.constructor.name, { state });
    this.internalState = {
      ...this.state,
      ...state,
    };
    if (this.listeners.length > 0) {
      this.listeners.forEach(listener => listener(this.state));
    }
  }

  subscribe(listener: Subscription<S>) {
    // console.log('subscribe: ', this.constructor.name);
    this.listeners.push(listener);
  }

  unsubscribe(listener: Subscription<S>) {
    // console.log('unsubscribe: ', this.constructor.name);
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  public resetState(): void {}
}

type Subscription<S> = (state: S) => void;
