import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  ApiOkWrappedPaginatedResponse,
  ApiOkWrappedResponse,
} from '../shared/decorator/swagger-response.decorator';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { ResponseMessage } from '../shared/decorator/response-message.decorator';
import { Employee } from './models/employee.model';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({
    summary: 'Returns list of employees',
  })
  @ApiOkWrappedPaginatedResponse(EmployeeDto, 'Paginated list of employees')
  @ResponseMessage('Employees list fetched successfully')
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, default: 10 })
  async findAll(@Query() queries: EmployeeQueryDto) {
    return this.employeesService.fetchEmployees({
      page: queries.page,
      pageSize: queries.pageSize,
    });
  }

  @Get('/:id')
  @ApiOperation({
    summary: `Returns specific employee`,
  })
  @ResponseMessage('Employee information fetched')
  @ApiOkWrappedResponse(EmployeeDto, 'Get employee')
  @ApiParam({
    name: 'id',
    description: 'employee id',
    type: 'number',
  })
  async findOne(@Param() params: { id: number }) {
    return this.employeesService.fetchEmployee(params.id);
  }

  @Post()
  @ApiOperation({
    summary: 'Add employee',
  })
  @ApiOkWrappedResponse(EmployeeDto, 'Employee')
  @ResponseMessage('Employee has been created')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiCreatedResponse({ description: 'Employee created' })
  async create(@Body() body: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.createEmployee(body);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update employee information',
  })
  @ApiOkWrappedResponse(EmployeeDto, 'Employee')
  @ResponseMessage('Employee information has been updated')
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiParam({
    name: 'id',
    description: 'employee id',
    type: 'number',
  })
  async update(
    @Param() params: { id: number },
    @Body() body: UpdateEmployeeDto,
  ) {
    return this.employeesService.updateEmployee({
      id: params.id,
      payload: body,
    });
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete employee ',
  })
  @ResponseMessage('Employee has been deleted')
  @ApiParam({
    name: 'id',
    description: 'employee id',
    type: 'number',
  })
  async delete(@Param() params: { id: number }) {
    return this.employeesService.deleteEmployee(params.id);
  }
}
