import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../schemas/product.schema.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save(); // Lấy tất cả sản phẩm từ MongoDB
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec(); // Lấy tất cả sản phẩm từ MongoDB
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec(); // Tìm sản phẩm theo ID
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec(); // Cập nhật sản phẩm
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec(); // Xóa sản phẩm
  }
}
