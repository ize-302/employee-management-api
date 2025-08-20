import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeesService, PaginationService],
})
export class EmployeesModule {}
