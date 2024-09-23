import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersApp } from '../schemas/users_app.schema';

@Injectable()
export class UsersAppService {
    constructor(@InjectModel(UsersApp.name) private userModel: Model<UsersApp>) { }

    async create(user: UsersApp): Promise<UsersApp> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findAll(): Promise<UsersApp[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<UsersApp> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, user: UsersApp): Promise<UsersApp> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<UsersApp> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
