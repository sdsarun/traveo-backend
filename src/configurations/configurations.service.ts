import { Injectable } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigService } from "@nestjs/config";
import { HelmetOptions } from "helmet";
import { Environment } from "src/constants/env.constant";
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

  get dbMainConfig() {
    return "";
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