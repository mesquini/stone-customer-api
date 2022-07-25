import { ErrorType, OperationalError } from './operational.error';

export class NotFoundError extends OperationalError {
  constructor(error: string) {
    super(ErrorType.NotFoundError, error);
  }
}
