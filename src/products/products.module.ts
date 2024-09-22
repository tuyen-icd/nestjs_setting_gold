import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from '../schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), // Đăng ký ProductModel
  ], // Khai báo controller cho các route của sản phẩm
  controllers: [ProductsController], // Khai báo controller cho các route của sản phẩm
  providers: [ProductsService], // Khai báo service xử lý logic nghiệp vụ của sản phẩm
})
export class ProductsModule {}
