import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from 'src/services/auth/jwt.service';

@Injectable()
export class VerifyAccessTokenMiddleware implements NestMiddleware {
  private readonly logger = new Logger(VerifyAccessTokenMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const accessToken = this.extractTokenFromRequest(req);
    if (!accessToken) {
      this.logger.warn('Authorization token is missing or invalid');
      throw new UnauthorizedException(
        'Authorization token is missing or invalid',
      );
    }

    try {
      await this.jwtService.verifyToken(accessToken);
      next();
    } catch (error) {
      this.logger.error('Token verification failed', error.stack);
      throw new UnauthorizedException('Token verification failed');
    }
  }

  private extractTokenFromRequest(req: Request): string | null {
    const authorizationHeader = req.headers?.authorization;
    if (!authorizationHeader) {
      return null;
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return null;
    }

    return token;
  }
}
