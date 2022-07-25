import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ErrorType,
  OperationalError,
  PipeValidationError,
} from '../errors/operational.error';

@Catch(OperationalError)
export class OperationalErrorFilter implements ExceptionFilter {
  private readonly errorMap: Map<ErrorType, HttpStatus> = new Map()
    .set(ErrorType.DataValidationError, HttpStatus.BAD_REQUEST)
    .set(ErrorType.MissingDataError, HttpStatus.CONFLICT)
    .set(ErrorType.NotFoundError, HttpStatus.NOT_FOUND)
    .set(ErrorType.UnauthorizedError, HttpStatus.UNAUTHORIZED);

  catch(error: OperationalError | PipeValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof OperationalError) {
      const status = this.resolveStatus(error);

      response.status(status).json({
        statusCode: status,
        error: error.message.toLowerCase(),
        path: response.req.url,
        message: error.stack,
      });
    } else {
      response.status(error.response.statusCode).json({
        ...error.response,
        path: response.req.url,
      });
    }
  }

  private resolveStatus(error: OperationalError): HttpStatus {
    const status = this.errorMap.get(error.errorType);

    return status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
