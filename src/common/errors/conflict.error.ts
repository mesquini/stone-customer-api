import { ErrorType, OperationalError } from './operational.error';

export class ConflictError extends OperationalError {
  constructor(error: string) {
    super(ErrorType.ConflictError, error);
  }
}
