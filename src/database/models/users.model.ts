import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ 
  tableName: "users",
})
export class Users extends Model<Users> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING(60), unique: true, allowNull: false })
  username: string;
}