import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type UsersAttributes = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
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
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  username: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;
}
