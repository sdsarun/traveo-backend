import { Injectable, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { ConfigurationsService } from 'src/configurations/configurations.service';

@Injectable()
export class Auth0Service {
  private readonly logger = new Logger(Auth0Service.name);
  private client: jwksClient.JwksClient;

  constructor(private readonly configurationService: ConfigurationsService) {
    this.client = jwksClient({
      jwksUri: this.configurationService.auth0Config.issuerBaseUrl.concat(
        `/.well-known/jwks.json`,
      ),
    });
  }

  private async getPublicKey(kid: string): Promise<string> {
    const key = await this.client.getSigningKey(kid);
    return key.getPublicKey();
  }

  public async verifyToken(token: string): Promise<any> {
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      throw new Error('Invalid token');
    }

    const { kid } = decoded.header;
    const publicKey = await this.getPublicKey(kid);

    try {
      const payload = jwt.verify(token, publicKey);
      return payload;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Token verification failed');
    }
  }
}
