import { Module } from '@nestjs/common';
import { ClerkWebhookService } from './clerk-webhook.service';
import { ExternalController } from './external.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [ClerkWebhookService],
  exports: [ClerkWebhookService],
  controllers: [ExternalController],
})
export class ExternalModule {}
