import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './models/dto/create-product.dto';
import { UpdateProductDto } from './models/dto/update-product.dto';
import { PaginationDTO } from 'src/common/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern({ cmd: 'createProductMessage' })
  async create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // @Get()
  @MessagePattern({ cmd: 'findAllProductsMessage' })
  async findAll(@Payload() paginationDTO: PaginationDTO) {
    return this.productsService.findAll(paginationDTO);
  }

  // @Get(':id')
  @MessagePattern({ cmd: 'findOneProductMessage' })
  async findOne(@Payload('id', ParseIntPipe) id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd: 'updateProductMessage' })
  async update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd: 'deleteProductMessage' })
  async remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @MessagePattern({ cmd: 'validateProducts' })
  async validateProduct(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }

  @MessagePattern({ cmd: 'findProductsByIds' })
  async findProductsByIds(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }
}
