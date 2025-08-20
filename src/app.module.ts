import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Employee } from './employees/models/employee.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory',
      // storage: './database.sqlite',
      models: [Employee],
      autoLoadModels: true,
      synchronize: true,
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
