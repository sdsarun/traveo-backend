import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UserCredentialTypes } from './user_credential_types.model';

export type UsersAttributes = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  user_credential_type_id: number | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

@Table({
  tableName: 'users',
})
export class Users extends Model<UsersAttributes> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.literal(
      `concat('user_',  REPLACE(gen_random_uuid()::varchar, '-', ''))`,
    ),
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  user_credential_type_id: number;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @BelongsTo(() => UserCredentialTypes, {
    foreignKey: 'user_credential_type_id',
  })
  user_credential_type: UserCredentialTypes;
}
