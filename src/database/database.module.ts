import { Logger, Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { ConfigurationsService } from "src/configurations/configurations.service";

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigurationsService],
      useFactory: async (configurationsService: ConfigurationsService) => {
        return configurationsService.dbMainConfig;
      }
    }),
  ]
})
export class DatabaseModule {
  private readonly logger = new Logger(DatabaseModule.name)

  constructor(
    private readonly sqz: Sequelize
  ) { 
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