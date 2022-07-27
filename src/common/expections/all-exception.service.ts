import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const stack: any = {};

    if (exception.response) {
      Object.assign(stack, {
        message: exception.response.message,
      });
    }

    if (exception instanceof Error) {
      Object.assign(stack, {
        statusCode: status,
        name: exception.name,
        method: request.method,
        path: request.url,
        exception: exception.message,
        body: request.body,
        stack: exception.stack,
        error: request.error,
      });

      Logger.error(stack);
    }

    if (process.env.NODE_ENV === 'prod') {
      const responseBody = {
        statusCode: status,
        message: stack?.exception || 'Internal Server Error',
        timestamp: new Date().toISOString(),
        error: stack?.error,
      };
      httpAdapter.reply(ctx.getResponse(), responseBody, status);
    } else {
      httpAdapter.reply(ctx.getResponse(), stack, status);
    }
  }
}
