import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse() instanceof Object
          ? (exception.getResponse() as any).message
          : exception.message
        : 'Internal server error';

    const requestId = request?.requestId || null;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      requestPath: `${httpAdapter.getRequestMethod(request)} - ${httpAdapter.getRequestUrl(request)}`,
      message: message,
      requestId: requestId,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
