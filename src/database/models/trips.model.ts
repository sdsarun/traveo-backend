import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'trips',
})
export class Trips extends Model<Trips> {
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
}
