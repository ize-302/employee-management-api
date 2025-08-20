import { Column, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'employee',
})
export class Employee extends Model<Employee> {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  role: string;
}
