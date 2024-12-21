import { Column, DataType, Model, Table } from 'sequelize-typescript';

export type TripsAttributes = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
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

  @Column({ type: DataType.UUID })
  user_id: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.DATE })
  start_date: Date;

  @Column({ type: DataType.DATE })
  end_date: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;
}