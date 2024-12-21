import { ClerkOptions } from '@clerk/express';
import { Injectable, ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { HelmetOptions } from 'helmet';
import { MAIN_MODELS } from 'src/database/models';
import {
  Environment,
  EnvironmentVariables,
} from 'src/shared/constants/env.constant';

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

  get validationPipeConfig(): Readonly<ValidationPipeOptions> {
    return {
      // transform: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
      whitelist: true,
    };
  }

  get databaseMainConfig(): Readonly<SequelizeModuleOptions> {
    return {
      dialect: 'postgres',
      host: this.config.get('DB_MAIN_HOST'),
      port: this.config.get('DB_MAIN_PORT'),
      username: this.config.get('DB_MAIN_USERNAME'),
      password: this.config.get('DB_MAIN_PASSWORD'),
      database: this.config.get('DB_MAIN_DATABASE'),
      schema: this.config.get('DB_MAIN_SCHEMA'),
      models: MAIN_MODELS,
      autoLoadModels: true,
      synchronize: true,
      define: {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
      },
      dialectOptions: {
        ssl: this.config.get('DB_MAIN_SSL') === 'true',
      },
      // sync: {
      //   force: true,
      //   alter: true,
      // },
    };
  }

  get helmetConfig(): Readonly<HelmetOptions> {
    return {};
  }

  get corsConfig(): Readonly<CorsOptions> {
    return {};
  }

  get clerkConfig(): Readonly<
    Pick<ClerkOptions, 'jwtKey' | 'secretKey' | 'publishableKey'>
  > {
    return {
      jwtKey: this.config.get('CLERK_JWT_KEY') ?? '',
      publishableKey: this.config.get('CLERK_PUBLISHABLE_KEY') ?? '',
      secretKey: this.config.get('CLERK_SECRET_KEY') ?? '',
    };
  }
}
