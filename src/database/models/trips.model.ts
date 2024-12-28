import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type TripsAttributes = {
  id: string;
  user_id: string | null;
  name: string | null;
  description: string | null;
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

@Table({
  tableName: 'trips',
})
export class Trips extends Model<TripsAttributes> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.UUID, allowNull: true })
  user_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.DATE, allowNull: true })
  start_date: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  end_date: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;
}