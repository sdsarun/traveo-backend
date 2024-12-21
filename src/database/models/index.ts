import { ModelCtor } from 'sequelize-typescript';
import { Trips } from './trips.model';
import { Users } from './users.model';

export const MAIN_MODELS: ModelCtor[] = [Trips, Users];
