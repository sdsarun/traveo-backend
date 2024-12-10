import { Injectable, ValidationPipeOptions } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigService } from "@nestjs/config";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { HelmetOptions } from "helmet";
import { Environment } from "src/constants/env.constant";
import { MODELS } from "src/database/models";
import { EnvironmentVariables } from "src/validation/env.validation";

@Injectable()
export class ConfigurationsService {

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  get config() {
    return this.configService;
  }

  get isDevelopment() {
    return this.configService.get("NODE_ENV") === Environment.Development
  }

  get isProduction() {
    return this.configService.get("NODE_ENV") === Environment.Production
  }

  get dbMainConfig(): Readonly<SequelizeModuleOptions> {
    return {
      dialect: "postgres",
      host: this.config.get("DB_MAIN_HOST"),
      port: this.config.get("DB_MAIN_PORT"),
      username: this.config.get("DB_MAIN_USERNAME"),
      password: this.config.get("DB_MAIN_PASSWORD"),
      database: this.config.get("DB_MAIN_DATABASE"),
      schema: this.config.get("DB_MAIN_SCHEMA"),
      models: MODELS,
      autoLoadModels: true,
      synchronize: this.isDevelopment,
      dialectOptions: {
        ssl: true
      },
      define: {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
      },
    }
  }

  get validationPipeConfig(): Readonly<ValidationPipeOptions> {
    return {
      transform: true,
      whitelist: true,
    }
  }

  get helmetConfig(): Readonly<HelmetOptions> {
    return {
    }
  }

  get corsConfig(): Readonly<CorsOptions> {
    return {
    }
  }
}