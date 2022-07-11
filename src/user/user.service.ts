/* eslint-disable prettier/prettier */
// handles busines logic (connecting to database etc...)
import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from "src/user/user.model";

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<User>) {}
    
    async getUsers(){
        const users = await this.userModel.find();
        return users;
    }

}