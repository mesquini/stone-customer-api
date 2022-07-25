import { ErrorType, OperationalError } from './operational.error';

export class DataValidationError extends OperationalError {
  constructor(error: string) {
    super(ErrorType.DataValidationError, error);
  }
}
