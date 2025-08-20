import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Post,
  Put,
} from '@nestjs/common';

@Controller('employees')
export class EmployeesController {
  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Get(':id')
  findOne() {
    throw new NotImplementedException();
  }

  @Post()
  create() {
    throw new NotImplementedException();
  }

  @Put(':id')
  update() {
    throw new NotImplementedException();
  }

  @Delete(':id')
  delete() {
    throw new NotImplementedException();
  }
}
