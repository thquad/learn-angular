export interface ActionState {
  done: boolean;
  pending: boolean;
  error?: Error;
}


export class ActionStateCreator {
  public static create(): ActionState {
    return {
      done: false,
      pending: false,
      error: undefined
    };
  }

  public static onStart(): ActionState {
    return {
      done: false,
      pending: true,
      error: undefined
    };
  }

  public static onSuccess(): ActionState {
    return {
      done: true,
      pending: false,
      error: undefined
    };
  }

  public static onError(error: Error): ActionState {
    return {
      done: false,
      pending: false,
      error
    };
  }

  public static reset(): ActionState {
    return {
      done: false,
      pending: false,
      error: undefined
    };
  }

  public static isInitialState(state: ActionState): boolean {
    const { pending, done, error } = state;
    return !pending && !done && !error;
  }
}
