import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersAppService } from './users_app.service';
import { UsersController } from './users_app.controller';
import { UsersApp, UserSchema } from '../schemas/users_app.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UsersApp.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersAppService],
})
export class UsersAppModule { }
