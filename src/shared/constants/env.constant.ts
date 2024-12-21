import { IsEnum, IsNumber, IsString, Max, Min } from "class-validator";
import { IsTrueOrFalseString } from "src/common/validators/is-true-or-false-string.validator";

export enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
}

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

  @IsTrueOrFalseString()
  DB_MAIN_SSL: string;

  @IsString()
  CLERK_SECRET_KEY: string;

  @IsString()
  CLERK_PUBLISHABLE_KEY: string;

  @IsString()
  CLERK_JWT_KEY: string;
}
