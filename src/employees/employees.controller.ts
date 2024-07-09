/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query ,ParseIntPipe} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { query } from 'express';


@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll(@Query('role')role?:'intern'|'engineer'|'manager'|'student') {
    return this.employeesService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id',ParseIntPipe)id:number) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    // Assuming updateEmployeeDto contains both mail and role fields
    return this.employeesService.update(+id, updateEmployeeDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
