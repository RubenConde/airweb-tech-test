import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from 'src/models/product/dto/product.dto';
import { BaseProductService } from 'src/models/product/interfaces/product.service.interface';
import { Product } from 'src/models/product/entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user/entity/user.entity';

@Injectable()
export class ProductService implements BaseProductService {
   constructor(@InjectRepository(Product) private ProductRepo: Repository<Product>) {}

   async index(requestUser: User | null) {
      const isUserLoggedIn = Boolean(requestUser);
      const productList = await this.ProductRepo.find({
         select: {
            description: true,
            id: true,
            label: true,
            price: true,
            thumbnailUrl: true,
         },
         where: [
            {
               visibleAuthenticated: isUserLoggedIn,
            },
            {
               visiblePublic: !isUserLoggedIn,
            },
         ],
      });

      return productList;
   }

   async show(productId: number, requestUser: User | null = null) {
      const isUserLoggedIn = Boolean(requestUser);

      const productFound = await this.ProductRepo.findOne({
         select: {
            description: true,
            id: true,
            label: true,
            price: true,
            thumbnailUrl: true,
         },
         where: [
            {
               id: productId,
               visibleAuthenticated: isUserLoggedIn,
            },
            {
               id: productId,
               visiblePublic: !isUserLoggedIn,
            },
         ],
      });

      if (productFound === null) throw new NotFoundException(`${Product.name} not found.`);

      return productFound;
   }

   async store(productData: CreateProductDTO) {
      const productFound = await this.ProductRepo.findOne({
         where: { label: productData.label },
         withDeleted: true,
      });

      if (productFound) throw new ConflictException('Product already exists');

      const newProduct = await this.ProductRepo.save(productData);

      const product = await this.show(newProduct.id);

      return product;
   }

   async update(productId: number, productData: UpdateProductDTO) {
      await this.show(productId);

      const product = await this.ProductRepo.findOneBy({ id: productId });

      await this.ProductRepo.save({ ...product, ...productData });
   }

   async delete(productId: number) {
      await this.show(productId);

      await this.ProductRepo.softDelete(productId);
   }
}
