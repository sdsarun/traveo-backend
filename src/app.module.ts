import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { HealthModule } from './services/health/health.module';
import { ClerkRequiredAuthMiddleware } from './common/middlewares/clerk-required-auth.middleware';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { ExternalModule } from './services/external/external.module';
import { UsersModule } from './services/users/users.module';
@Module({
  imports: [
    ConfigurationsModule,
    LoggerModule,
    DatabaseModule,
    HealthModule,
    ExternalModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ClerkRequiredAuthMiddleware)
      .exclude(
        { path: '/health', method: RequestMethod.ALL, version: '1' },
        {
          path: '/external/clerk/webhook',
          method: RequestMethod.POST,
          version: '1',
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL, version: '1' });
  }
}
