import { UnexpectedError } from "@/core/common/suport/errors/unexpected.error";

export class RequiredFieldError extends UnexpectedError {
  constructor(message: string) {
    super(message);
  }
}
