import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomRequestId } from "src/shared/utils/generators/request-id.generator";

@Injectable()
export class ApplyRequestIdMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    const requestId = randomRequestId();
    req.requestId = requestId;
    next();
  }
}