/* eslint-disable prettier/prettier */
// handles logic of request
import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    constructor(private userService: UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('getAllUsers')
    getUsers() {
        return this.userService.getUsers();
    }
}