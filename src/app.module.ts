import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { UsersAppModule } from './users_app/users_app.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Module để đọc các biến môi trường từ file .env
    MongooseModule.forRoot(
      'mongodb+srv://tuyennn:14Fl0Rte28sxa2HO@cluster0.1i1hosm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ), // Kết nối với MongoDB Atlas bằng URL từ file .env
    ProductsModule, UsersAppModule, // Import module ProductsModule để quản lý sản phẩm
  ],
})
export class AppModule {}
