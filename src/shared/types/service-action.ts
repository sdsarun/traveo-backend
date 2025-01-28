import { ValidationError } from 'class-validator';
import { Transaction } from 'sequelize';

export type ServiceActionOptions = {
  validateDTO?: boolean;
  throwErrorOnValidateFailed?: boolean;
  onError?: (errors: ValidationError[]) => void;
  transaction?: Transaction;
};
