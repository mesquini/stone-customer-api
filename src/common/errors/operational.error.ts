export enum ErrorType {
  DataValidationError = 1,
  MissingDataError = 2,
  NotFoundError = 3,
  UnauthorizedError = 4,
}

export class OperationalError extends Error {
  constructor(readonly errorType: ErrorType, readonly error: string) {
    super(error);
  }
}

export type PipeValidationError = {
  response: {
    statusCode: number;
    message: string | string[];
    error: string;
  };
};
