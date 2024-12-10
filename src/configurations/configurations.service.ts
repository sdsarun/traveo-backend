import { Injectable } from "@nestjs/common";
import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { ConfigService } from "@nestjs/config";
import { HelmetOptions } from "helmet";

@Injectable()
export class ConfigurationsService {

  constructor(
    private readonly configService: ConfigService,
  ) {}

  get config() {
    return this.configService;
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