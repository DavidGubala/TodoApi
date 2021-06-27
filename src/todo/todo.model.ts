import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({ primaryKey: true })
  id: string;

  @Column
  title: string;

  @Column
  body: string;

  @CreatedAt
  creationDate: Date;
}
