import { PaginationDTO } from './../common/pagination.dto';
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './models/dto/create-product.dto';
import { UpdateProductDto } from './models/dto/update-product.dto';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './models/classes/product.entity';
import { In, Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);
  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { page, limit } = paginationDTO;

    const totalPage = await this.productRepository.count({ where: { available: true } });
    const lastPage = Math.ceil(totalPage / limit);
    return {
      data: await this.productRepository.find({
        take: limit,
        skip: (page - 1) * limit,
        where: { available: true },
      }),
      meta: {
        total: totalPage,
        page: page,
        lastPage,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) throw new RpcException(new NotFoundException(`Product with id ${id} not found.`));
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto;

    await this.findOne(id);

    return this.productRepository.save({ id, ...data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.productRepository.delete(id);
  }
  async softDelete(id: number) {
    return this.productRepository.softDelete(id);
  }

  async validateProducts({ ids }: any) {
    ids = ids;
    ids = Array.from(new Set(ids));
    console.log(ids);
    
    const products = await this.productRepository.find({
      where: {
        id: In(ids),
      },
    });

    if (products.length !== ids.length) {
      throw new RpcException({ message: 'Some products where not found', status: HttpStatus.BAD_REQUEST });
    }
    return products;
  }
}
