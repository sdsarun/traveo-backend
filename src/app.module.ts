import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationsModule } from './configurations/configurations.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './services/users/users.module';
import { HealthModule } from './services/health/health.module';

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
export class AppModule {}
