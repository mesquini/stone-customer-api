import { ErrorType, OperationalError } from './operational.error';

export class UnauthorizedError extends OperationalError {
  constructor(error: string) {
    super(ErrorType.UnauthorizedError, error);
  }
}
