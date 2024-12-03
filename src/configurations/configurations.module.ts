import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ConfigurationsService } from "./configurations.service";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [".env", ".env.prod", ".env.dev", ".env.test"],
    }),
  ],
  providers: [ConfigurationsService],
  exports: [ConfigurationsService]
})
export class ConfigurationsModule {}