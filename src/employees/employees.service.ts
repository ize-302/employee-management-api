import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeRepository: typeof Employee,
    private readonly paginationService: PaginationService,
  ) {}

  async fetchEmployees({
    page = 1,
    pageSize = 10,
  }): Promise<PaginatedResponseDto<Employee>> {
    const data = await this.employeeRepository.findAll({
      limit: pageSize,
      order: [['createdAt', 'DESC']],
      offset: this.paginationService.getOffsetValue({
        currentPage: page,
        itemsPerPage: pageSize,
      }),
    });

    const totalItems = await this.employeeRepository.count();
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
    const findUser = await this.employeeRepository.findOne({ where: { id } });
    if (!findUser) {
      throw new NotFoundException('Employee not found');
    }
    return findUser;
  }

  async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeRepository.create(createEmployeeDto as any);
  }

  async updateEmployee(payload: {
    id: number;
    payload: UpdateEmployeeDto;
  }): Promise<Employee> {
    await this.fetchEmployee(payload.id);
    await this.employeeRepository.update(payload.payload, {
      where: {
        id: payload.id,
      },
    });
    const updatedUser = await this.fetchEmployee(payload.id);
    return updatedUser;
  }

  async deleteEmployee(id: number): Promise<boolean> {
    await this.fetchEmployee(id);
    const deletedEmployee = await this.employeeRepository.destroy({
      where: { id },
    });
    if (deletedEmployee) {
      return true;
    } else {
      return false;
    }
  }
}
