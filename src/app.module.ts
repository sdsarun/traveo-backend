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
import { UsersModule } from './services/users/users.module';
import { HealthModule } from './services/health/health.module';
import { VerifyAccessTokenMiddleware } from './common/middlewares/verify-access-token.middleware';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigurationsModule,
    DatabaseModule,
    HealthModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyAccessTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
