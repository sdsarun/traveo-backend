import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './services/health/health.module';
import { UsersModule } from './services/users/users.module';
import { ClerkRequiredAuthMiddleware } from './common/middlewares/clerk-required-auth.middleware';

@Module({
  imports: [
    ConfigurationsModule,
    DatabaseModule,
    HealthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkRequiredAuthMiddleware)
      .exclude({ path: '/health', method: RequestMethod.ALL, version: '1' })
      .forRoutes({ path: '*', method: RequestMethod.ALL, version: '1' });
      
  }
}
