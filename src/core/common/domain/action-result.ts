import { InvalidOperationError } from "../suport/errors";

export class ActionResult<ResultSuccess, ResultError> {
  private readonly _successful: boolean;
  private readonly _error?: ResultError;
  private readonly _value?: ResultSuccess;

  constructor(success: boolean, error?: ResultError, value?: ResultSuccess) {
    if (success && error) {
      throw new InvalidOperationError('A result cannot be successful and contain an error');
    }

    if (!success && !error) {
      throw new InvalidOperationError('A failing result needs to contain an error message');
    }

    this._successful = success;

    this._error = error;
    this._value = value;
  }

  get value(): ResultSuccess {
    if (!this._successful) {
      throw new InvalidOperationError('Cannot retrieve the value from a failed result.');
    }

    if (this._value === undefined) {
      throw new InvalidOperationError('Value is not defined.');
    }

    return this._value;
  }

  get error(): ResultError {
    if (this._successful) {
      throw new InvalidOperationError('Cannot retrieve an error from a successful result.');
    }

    if (this._error === undefined) {
      throw new InvalidOperationError('Error is not defined.');
    }

    return this._error;
  }

  get successful(): boolean {
    return this._successful;
  }

  get fail(): boolean {
    return !this._successful;
  }

  public static success<ResultSuccess, ResultError = null>(value?: ResultSuccess): ActionResult<ResultSuccess, ResultError> {
    return new ActionResult<ResultSuccess, ResultError>(true, undefined, value);
  }

  public static failure<ResultSuccess, ResultError>(error: ResultError): ActionResult<ResultSuccess, ResultError> {
    return new ActionResult<ResultSuccess, ResultError>(false, error);
  }

  public static combine(results: ActionResult<any, any>[]): ActionResult<any, any> {
    for (const result of results) {
      if (result.fail) { return result }
    }

    return ActionResult.success<any, any>();
  }
}
