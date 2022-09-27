import { UnexpectedError } from "@/core/common/suport/errors/unexpected.error";

export class InvalidOperationError extends UnexpectedError {
  constructor(message: string) {
    super(message);
  }
}
