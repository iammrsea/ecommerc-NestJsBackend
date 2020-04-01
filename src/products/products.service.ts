import { CursorService } from 'src/cursor/cursor.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product';
import { ProductRepository } from './product.repository';

import C from '../constants';

import { Product } from './product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { UploaderService } from 'src/uploader/uploader.service';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly cursorService: CursorService,
    private readonly uploaderService: UploaderService,
  ) {}

  find(
    limit?: number,
    cursor?: string,
    relation?: boolean,
  ): Promise<Product[]> {
    const perPage = limit || C.QUERY_RESULT_LIMIT;
    const startFrom = this.cursorService.decode(cursor);
    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.id >= :id', { id: startFrom })
      .take(perPage + 1);
    if (relation) {
      query.leftJoinAndSelect('product.category', 'category');
    }
    return query.getMany();
  }
  findById(id: number): Promise<Product> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id })
      .getOne();
  }

  async createUpdate(
    createProductDto: CreateProductDto,
    file: UploadImageDto,
    id?: number,
  ) {
    const prefix = `data:${file.mimetype};base64,`;
    const result = await this.uploaderService
      .getUploader()
      .uploader.upload(prefix + file.buffer.toString('base64'));
    let product;
    if (id) {
      product = {
        ...createProductDto,
        available: !!createProductDto.available,
        imageUrl: result.secure_url,
        id,
      };
    } else {
      product = {
        ...createProductDto,
        available: !!createProductDto.available,
        imageUrl: result.secure_url,
      };
    }

    // createProductDto.imageUrl = result.secure_url;
    const createdProdut = await this.productRepository.save(product);
    return {
      id: createdProdut.id,
      imageUrl: createdProdut.imageUrl,
      createdAt: createdProdut.createdAt,
    };
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, updateProductDto);
  }

  createBulk(createProductDto: CreateProductDto[]): Promise<Product[]> {
    return this.productRepository.save(createProductDto);
  }
  async updateBulk() {
    const products = await this.productRepository.find({ available: false });
    const productIs = products.map(product => product.id);
    return this.productRepository.update([...productIs], { available: true });
  }
}
