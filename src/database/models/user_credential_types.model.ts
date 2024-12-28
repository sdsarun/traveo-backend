import { Column, DataType, Model, Table } from "sequelize-typescript";

export type UserCredentialTypesAttributes = {
  id: number;
  name: string;
};

@Table({
  tableName: 'user_credential_types',
})
export class UserCredentialTypes extends Model<UserCredentialTypesAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}