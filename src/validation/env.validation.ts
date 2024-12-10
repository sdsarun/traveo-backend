
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from 'class-validator';
import { Environment } from 'src/constants/env.constant';

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  DB_MAIN_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_MAIN_PORT: number;

  @IsString()
  DB_MAIN_DATABASE: string;

  @IsString()
  DB_MAIN_SCHEMA: string;

  @IsString()
  DB_MAIN_USERNAME: string;

  @IsString()
  DB_MAIN_PASSWORD: string;
  
  // @IsString()
  // DB_MAIN_SSL: string;
}

export function validateEnviroment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
