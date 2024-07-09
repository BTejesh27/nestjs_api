/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-controller'; 
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John', role: 'intern' },
        { id: 2, name: 'Doe', role: 'employee' },
        { id: 3, name: 'Jane', role: 'manager' },
        { id: 4, name: 'Teja', role: 'Student' },
        { id: 5, name: 'Deepu', role: 'Student' }


    ];

    findAll(role?: 'intern' | 'employee' | 'manager' | 'Student'){
        if(role){
            const rolesArray = this.users.filter((user) => user.role === role);
            if(rolesArray.length===0) throw new NotFoundException("user not there")
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user =this.users.find(user=>user.id ===id)
        if(!user) throw new NotFoundException("User not foundddd")   
                 return user
    }

    create(user: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = { id: userByHighestId[0].id + 1, ...user };
        this.users.push(newUser);
        return newUser;
    }
 
    update(id: number, updateUser: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUser };
            }
            return user;
        });
        return this.findOne(id);
    }
    
    delete(id: number) {
        const removeUser=this.findOne(id)
        this.users =this.users.filter(user=>user.id !==id)
        return removeUser
    }
}