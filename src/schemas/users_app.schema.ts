import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UsersApp extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: number;

    @Prop({ required: true })
    password: string;

    @Prop()
    avatar: string;

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    gender: string;

    @Prop()
    birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(UsersApp);
