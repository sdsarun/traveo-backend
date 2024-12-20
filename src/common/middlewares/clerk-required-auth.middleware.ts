import { authenticateRequest, clerkClient } from '@clerk/express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigurationsService } from 'src/configurations/configurations.service';

@Injectable()
export class ClerkRequiredAuthMiddleware implements NestMiddleware {
  constructor(private readonly configurationsService: ConfigurationsService) {}

  async use(req: Request, res: Response, next: (error?: Error | any) => void) {
    try {
      const auth = await authenticateRequest({
        clerkClient,
        request: req,
        options: this.configurationsService.clerkConfig,
      });

      if (!auth.isSignedIn) {
        throw new UnauthorizedException();
      }

      next();
    } catch (error) {
      throw error;
    }
  }
}
