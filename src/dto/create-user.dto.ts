/* eslint-disable prettier/prettier */

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(['intern', 'employee', 'manager', 'Student'], {
        message: 'role must be either intern, employee, manager, or Student'
    })
    role: 'intern' | 'employee' | 'manager' | 'Student';
}

