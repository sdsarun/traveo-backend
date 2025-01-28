import { authenticateRequest, clerkClient } from '@clerk/express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class ClerkRequiredAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configurationsService: ConfigurationsService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(ClerkRequiredAuthMiddleware.name);
  }

  async use(req: Request, res: Response, next: (error?: Error | any) => void) {
    try {
      const auth = await authenticateRequest({
        clerkClient,
        request: req,
        options: this.configurationsService.clerkConfig.core,
      });

      this.logger.log(auth);

      if (!auth.isSignedIn) {
        throw new UnauthorizedException(auth.message);
      }

      console.log("[LOG]: ~ ClerkRequiredAuthMiddleware ~ use ~ auth:", auth)

      next();
    } catch (error) {
      this.logger.error("ClerkRequiredAuthMiddlewareError:", error);
      throw error;
    }
  }
}
