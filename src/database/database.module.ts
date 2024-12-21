import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ConfigurationsService } from 'src/configurations/configurations.service';
import { Logger } from 'src/logger/logger.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigurationsService],
      useFactory: async (configurationsService: ConfigurationsService) => {
        return configurationsService.databaseMainConfig;
      },
    }),
  ],
})
export class DatabaseModule {
  constructor(
    private readonly sqz: Sequelize,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(DatabaseModule.name);
    this.checkDatabaseConnection();
  }

  private async checkDatabaseConnection() {
    try {
      await this.sqz.authenticate();
      this.logger.log('Connection has been established successfully.');
    } catch (error) {
      this.logger.error('Unable to connect to the database:', error);
    }
  }
}
