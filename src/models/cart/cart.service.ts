import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDTO, UpdateCartDTO } from 'src/models/cart/dto/cart.dto';
import { BaseCartService } from 'src/models/cart/interfaces/cart.service.interface';
import { Cart } from 'src/models/cart/entity/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user/entity/user.entity';
import { Product } from 'src/models/product/entity/product.entity';
import { ProductToCart } from 'src/models/cart/entity/productToCart.entity';

@Injectable()
export class CartService implements BaseCartService {
   constructor(
      @InjectRepository(Cart) private CartRepo: Repository<Cart>,
      @InjectRepository(Product) private ProductRepo: Repository<Product>,
      @InjectRepository(User) private UserRepo: Repository<User>,
      @InjectRepository(ProductToCart) private ProductToCartRepo: Repository<ProductToCart>,
   ) {}

   async index() {
      const cartList = await this.CartRepo.find({
         relations: { products: false, user: true, productToCart: true },
      });

      return cartList;
   }

   async show(cartId: number) {
      const foundCart = await this.CartRepo.findOne({
         where: { id: cartId },
         select: { id: false, total: true, isFinished: true },
      });

      if (foundCart === null) throw new NotFoundException(`${Cart.name} not found`);

      return foundCart;
   }

   async store(cartData: CreateCartDTO) {
      const newCart = await this.CartRepo.save(cartData);

      const cart = await this.show(newCart.id);

      return cart;
   }

   async addProduct(cartId: number, productId: number, requestUser: User | null) {
      const product = await this.ProductRepo.findOneBy({ id: productId });
      if (product === null) throw new NotFoundException(`${Product.name} not found`);

      const cart = await this.CartRepo.findOneBy({ id: cartId });
      if (cart === null) throw new NotFoundException(`${Cart.name} not found`);
      else if (cart.isFinished) throw new ForbiddenException(`${Cart.name} is already done`);

      const userInfo = await this.UserRepo.findOneBy({ email: requestUser?.email });

      const productToCart = await this.ProductToCartRepo.save({
         cart,
         product,
         count: 1,
      });

      const newProducts = Object.assign([], cart.products);
      newProducts.push(product);

      const newProductToCart = Object.assign([], cart.productToCart);
      newProductToCart.push(productToCart);

      await this.CartRepo.save({
         ...cart,
         total: cart.total + product.price,
         products: newProducts,
         productToCart: newProductToCart,
         user: userInfo ?? undefined,
      });
   }

   async checkOut(cartId: number, requestUser: User) {
      const cart = await this.CartRepo.findOneBy({ id: cartId });
      if (cart === null) throw new NotFoundException(`${Cart.name} not found`);
      else if (cart.isFinished) throw new ForbiddenException(`${Cart.name} is already done`);

      const user = await this.UserRepo.findOneBy({ email: requestUser.email });
      if (user === null) throw new NotFoundException(`${User.name} not found`);

      await this.CartRepo.save({ ...cart, isFinished: true, user });

      this.store({ isFinished: false, total: 0 });
   }

   async update(cartId: number, cartData: UpdateCartDTO) {
      const cart = await this.show(cartId);

      await this.CartRepo.save({ ...cart, ...cartData });
   }

   async delete(cartId: number) {
      await this.show(cartId);

      await this.CartRepo.delete(cartId);
   }
}
