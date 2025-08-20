import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dataBaseConfig } from './database/database.config';

@Module({
  imports: [EmployeesModule, SequelizeModule.forRoot(dataBaseConfig)],
  providers: [],
})
export class AppModule {}
