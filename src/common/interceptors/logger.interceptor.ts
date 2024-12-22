import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, Observable, tap } from 'rxjs';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {
    this.logger.setContext(LoggerInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    const requestId = request?.requestId;

    this.logger.log({
      request: {
        requestId,
        method: request.method,
        url: request.originalUrl,
        headers: this.sanitize(request.headers),
        body: this.sanitize(request.body),
        query: request.query,
      },
    });

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;

        this.logger.log({
          response: {
            requestId,
            statusCode: response.statusCode,
            durationMs: duration,
          },
        });
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const errorStatusCode =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.error({
          error: {
            requestId,
            statusCode: errorStatusCode,
            durationMs: duration,
            errorMessage: error.message,
            stack: error.stack,
          },
        });

        throw error;
      }),
    );
  }

  private sanitize(data: Record<string, any>): Record<string, any> {
    if (!data) return {};
    const sanitized = structuredClone(data);
    // delete sanitized['authorization'];
    // delete sanitized['password'];
    return sanitized;
  }
}
