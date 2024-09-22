import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // @Post()
  // create(@Body() product: Product) {
  //   return this.productsService.create(product); // Gọi hàm create trong service
  // }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() product: Product,
  ) {
    // Nếu có upload hình ảnh thì thêm tên file vào product
    if (files && files.length > 0) {
      const imageFilenames = files.map((file) => file.filename); // Lấy danh sách tên file hình ảnh
      product.image = imageFilenames; // Lưu danh sách file vào trường image
    }
    // Gọi hàm create trong service và lưu sản phẩm
    return this.productsService.create(product);
  }

  @Get()
  findAll() {
    return this.productsService.findAll(); // Gọi hàm findAll trong service
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id); // Gọi hàm findOne trong service
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product) {
    return this.productsService.update(id, product); // Gọi hàm update trong service
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id); // Gọi hàm delete trong service
  }
}
