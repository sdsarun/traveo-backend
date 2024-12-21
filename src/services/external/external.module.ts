import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ExternalController } from './external.controller';
import { ExternalService } from './external.service';

@Module({
  imports: [UsersModule],
  providers: [ExternalService],
  exports: [ExternalService],
  controllers: [ExternalController],
})
export class ExternalModule {}
