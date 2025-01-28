import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    this.logger.setContext(FormatResponseInterceptor.name);

    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((controllerResult) => {
        const message = controllerResult?.message ?? 'Success';

        const formattedResponseObject = {
          success: true,
          statusCode: response.statusCode,
          message,
          data: controllerResult,
        };

        this.logger.log(
          { response: formattedResponseObject },
          FormatResponseInterceptor.name,
        );

        return formattedResponseObject;
      }),
    );
  }
}
