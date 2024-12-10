import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationsService } from "./configurations.service";
import { validateEnviroment } from "src/validation/env.validation";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [".env.local", ".env.dev", ".env.prod", ".env.test"],
      validate: validateEnviroment,
    }),
  ],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService]
})
export class ConfigurationsModule {}