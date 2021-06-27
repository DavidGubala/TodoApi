import {
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @PrimaryKey
  @Column({ primaryKey: true, allowNull: false })
  id: string;

  @Column
  title: string;

  @Column
  body: string;

  @CreatedAt
  createdat: Date;
}
