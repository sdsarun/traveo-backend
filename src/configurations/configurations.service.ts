import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationsService {

  constructor(
    private readonly configService: ConfigService,
  ) {}

  get config() {
    return this.configService;
  }

  getDatabaseTraveoConfig() {
  }
}