import { validate } from 'class-validator';
import { ServiceActionOptions } from 'src/shared/types/service-action';

export async function validateDTO<T extends object>(
  dto: T,
  options?: ServiceActionOptions,
): Promise<void> {
  const errors = await validate(dto, { whitelist: true });

  if (errors.length) {
    if (options?.throwErrorOnValidateFailed) {
      if (typeof options?.onError === 'function') {
        options?.onError(errors);
      } else {
        throw new Error(errors.toString());
      }
    }
  }
}
