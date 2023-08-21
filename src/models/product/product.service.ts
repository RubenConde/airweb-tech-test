import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateProductDTO, UpdateProductDTO } from 'src/models/product/dto/product.dto';
import { BaseProductService } from 'src/models/product/interfaces/product.service.interface';
import { Product } from 'src/models/product/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements BaseProductService {
   constructor(@InjectRepository(Product) private ProductRepo: Repository<Product>) {}

   async index() {
      const productList = await this.ProductRepo.find();

      return productList;
   }

   async show(productId: number) {
      const product = await this.ProductRepo.findOneBy({ id: productId }).then((foundProduct) => {
         if (foundProduct === null) throw new NotFoundException(`${Product.name} not found`);
         console.log(foundProduct);
         const { id, visibleAuthenticated, visiblePublic, ...filteredProduct } = foundProduct;
         return filteredProduct;
      });

      return product;
   }

   async store(productData: CreateProductDTO) {
      const isAlreadyCreated = await this.ProductRepo.findOneBy({ label: productData.label });

      if (isAlreadyCreated) throw new ConflictException('Product already exists');

      const newProduct = await this.ProductRepo.save(productData);

      const product = await this.show(newProduct.id);

      return product;
   }

   async update(productId: number, productData: UpdateProductDTO) {
      await this.show(productId);

      const product = await this.ProductRepo.findOneBy({ id: productId });

      await this.ProductRepo.save({ id: productId, ...product, ...productData });
   }

   async delete(productId: number) {
      await this.show(productId);

      await this.ProductRepo.delete(productId);
   }
}
