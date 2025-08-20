import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginatedResponseDto } from '../pagination/dto/pagination.dto';
import { PaginationService } from '../pagination/pagination.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
    private readonly paginationService: PaginationService,
  ) {}

  async fetchEmployees({
    page = 1,
    pageSize = 10,
  }): Promise<PaginatedResponseDto<Employee>> {
    const data = await this.employeeModel.findAll({
      limit: pageSize,
      order: [['createdAt', 'DESC']],
      offset: this.paginationService.getOffsetValue({
        currentPage: page,
        itemsPerPage: pageSize,
      }),
    });

    const totalItems = await this.employeeModel.count();
    return {
      data,
      meta: this.paginationService.getMetaData({
        currentPage: page,
        itemsPerPage: pageSize,
        totalItems: totalItems,
        itemCount: data.length,
      }),
    };
  }

  async fetchEmployee(id: number): Promise<Employee> {
    const findUser = await this.employeeModel.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('Employee not found');
    }
    return findUser;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeModel.create(createEmployeeDto as Employee);
  }

  async updateEmployee(payload: {
    id: number;
    payload: UpdateEmployeeDto;
  }): Promise<Employee> {
    await this.fetchEmployee(payload.id);
    await this.employeeModel.update(payload.payload, {
      where: {
        id: payload.id,
      },
    });
    const updatedUser = await this.fetchEmployee(payload.id);
    return updatedUser;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await this.fetchEmployee(id);
    const deletedEmployee = await this.employeeModel.destroy({
      where: { id },
    });
    if (deletedEmployee) {
      return true;
    } else {
      return false;
    }
  }
}
