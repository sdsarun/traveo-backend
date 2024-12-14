import { Injectable, ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { HelmetOptions } from 'helmet';
import { Environment } from 'src/shared/constants/env.constant';
import { MODELS } from 'src/database/models';
import { EnvironmentVariables } from 'src/validation/env.validation';

@Injectable()
export class ConfigurationsService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  get config() {
    return this.configService;
  }

  get isDevelopment() {
    return this.configService.get('NODE_ENV') === Environment.Development;
  }

  get isProduction() {
    return this.configService.get('NODE_ENV') === Environment.Production;
  }

  get dbMainConfig(): Readonly<SequelizeModuleOptions> {
    return {
      dialect: 'postgres',
      host: this.config.get('DB_MAIN_HOST'),
      port: this.config.get('DB_MAIN_PORT'),
      username: this.config.get('DB_MAIN_USERNAME'),
      password: this.config.get('DB_MAIN_PASSWORD'),
      database: this.config.get('DB_MAIN_DATABASE'),
      schema: this.config.get('DB_MAIN_SCHEMA'),
      models: MODELS,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: this.config.get('DB_MAIN_SSL') === 'true',
      },
      define: {
        freezeTableName: true,
        timestamps: false,
      },
      sync: {
        // force: true,
        alter: true,
      },
    };
  }

  get validationPipeConfig(): Readonly<ValidationPipeOptions> {
    return {
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
      whitelist: true,
    };
  }

  get helmetConfig(): Readonly<HelmetOptions> {
    return {};
  }

  get corsConfig(): Readonly<CorsOptions> {
    return {};
  }

  get auth0Config(): Readonly<{ issuerBaseUrl: string }> {
    return {
      issuerBaseUrl: this.config.get('AUTH0_ISSUER_BASE_URL'),
    };
  }
}
