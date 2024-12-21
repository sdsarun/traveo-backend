import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClerkWebhookService } from './clerk-webhook.service';
import { UsersService } from '../users/users.service';

@Controller('external')
export class ExternalController {
  constructor(
    private readonly clerkWebhookService: ClerkWebhookService,
    private readonly usersService: UsersService,
  ){}

  @HttpCode(HttpStatus.OK)
  @Post('/clerk/webhook')
  async clerkWebhook(
    @Req() req: Request,
  ) {
    const payload = await this.clerkWebhookService.verifyWebhookRequest(req);

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

      default: {
        throw new ForbiddenException();
      }
    }
  }
}
