import { Controller, ForbiddenException, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { ExternalService } from './external.service';

@Controller('external')
export class ExternalController {
  constructor(
    private readonly externalService: ExternalService,
    private readonly usersService: UsersService,
  ){}

  @HttpCode(HttpStatus.OK)
  @Post('/clerk/webhook')
  async clerkWebhook(
    @Req() req: Request,
  ) {
    const payload = await this.externalService.verifyClerkWebhookRequest(req);

    switch (payload.type) {
      case "user.created": {
        return this.usersService.createUserFromWebhook(payload.data);
      }

      case "user.deleted" : {
        return this.usersService.deleteUserFromWebhook(payload.data);
      }

      case "user.updated": {
        return this.usersService.updateUserFromWebhook(payload.data);
      }

      case "session.created": {
      }

      default: {
        throw new ForbiddenException();
      }
    }
  }
}
