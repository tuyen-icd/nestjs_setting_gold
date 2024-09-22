import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  rating: number;

  @Prop()
  discountPercentage: number;

  @Prop({ required: true })
  price: number;

  @Prop([String])
  image: string[];

  @Prop()
  thumbnail: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
