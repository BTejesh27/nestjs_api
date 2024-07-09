/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-controller';



@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    /*
    GET /users
    GET /users/:id
    POST /users
    PUT /users/:id
    DELETE /users/:id
    */
    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'intern' | 'employee' | 'manager' | 'Student') {
        return this.userService.findAll(role);
    }
    
   
    @Get(':id') // GET /users/:id
    findOne(@Param('id',ParseIntPipe)id:number) {
        return this.userService.findOne(id)
    }
    @Post() // POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    

    @Patch(':id') // GET /users/:id
    update(@Param('id',ParseIntPipe)id:number,@Body(ValidationPipe) userUpdate:UpdateUserDto) {
        return this.userService.update(id,userUpdate)
       
    }
    @Delete(':id') // GET /users/:id
    delete(@Param('id',ParseIntPipe)id:number) {
        return this.userService.delete(id)
    }
    
}
