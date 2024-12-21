import { plainToInstance } from 'class-transformer';
import {
  validateSync
} from 'class-validator';
import { EnvironmentVariables } from 'src/shared/constants/env.constant';

export function validateEnviroment(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
