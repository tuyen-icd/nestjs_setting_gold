import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersApp } from '../schemas/users_app.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersAppService {
    constructor(@InjectModel(UsersApp.name) private userModel: Model<UsersApp>) { }

    async create(user: UsersApp): Promise<UsersApp> {
        try {
            const existingUser = await this.userModel.findOne({ email: user.email });
            if (existingUser) {
                throw new ConflictException('Emai already exists!');
            }
            // Sử dụng bcrypt để băm mật khẩu
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);

            user.password = hashedPassword;
            const newUser = new this.userModel(user);
            return newUser.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Phương thức xác thực mật khẩu (nếu cần)
    async validatePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, hashedPassword);
    }

    async findAll(): Promise<UsersApp[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<UsersApp> {
        return this.userModel.findById(id).exec(); 
    }

    async findByEmail(email: string): Promise<UsersApp | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(id: string, user: UsersApp): Promise<UsersApp> {
        return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async delete(id: string): Promise<UsersApp> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
 