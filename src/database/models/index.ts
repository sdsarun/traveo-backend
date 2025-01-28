import { ModelCtor } from 'sequelize-typescript';
import { Trips } from './trips.model';
import { Users } from './users.model';
import { UserCredentialTypes } from './user_credential_types.model';

export const MAIN_MODELS: ModelCtor[] = [Trips, Users, UserCredentialTypes];
