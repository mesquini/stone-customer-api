import { ErrorType, OperationalError } from './operational.error';

export class MissingDataError extends OperationalError {
  constructor(error: string) {
    super(ErrorType.MissingDataError, error);
  }
}
