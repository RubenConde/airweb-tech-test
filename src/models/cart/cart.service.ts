import {
   ConflictException,
   ForbiddenException,
   Injectable,
   NotFoundException,
} from '@nestjs/common';
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
         relations: {
            productToCart: false,
            user: false,
         },
      });

      return cartList;
   }

   async show(cartId: number) {
      const foundCart = await this.CartRepo.findOne({
         relations: {
            productToCart: false,
            user: false,
         },
         where: {
            id: cartId,
         },
      });

      if (foundCart === null) throw new NotFoundException(`${Cart.name} not found`);

      return foundCart;
   }

   async store(cartData: CreateCartDTO) {
      const newCart = await this.CartRepo.save(cartData);

      const cart = await this.show(newCart.id);

      return cart;
   }

   async addProduct(
      cartId: number,
      productId: number,
      requestUser: User | null,
      productQuantity = 1,
   ) {
      const { cartFound, productFound, userFound, cartToModify, productToCartFound } =
         await this.verifyProductUpdate(cartId, productId, requestUser);

      let newProductToCart: ProductToCart;

      if (productToCartFound)
         newProductToCart = await this.ProductToCartRepo.save({
            ...productToCartFound,
            count: productToCartFound.count + productQuantity,
         });
      else
         newProductToCart = await this.ProductToCartRepo.save({
            cart: cartFound,
            product: productFound,
            count: productQuantity,
         });

      const newProductToCartList = [...cartToModify.productToCart];
      const productToCartIndex = newProductToCartList.findIndex(
         (productToCart) =>
            productToCart.cart === newProductToCart.cart &&
            productToCart.product === newProductToCart.product,
      );

      if (productToCartIndex !== -1) newProductToCartList[productToCartIndex] = newProductToCart;
      else newProductToCartList.push(newProductToCart);

      await this.CartRepo.save({
         ...cartToModify,
         total: cartToModify.total + productFound.price * productQuantity,
         productToCart: newProductToCartList,
         user: userFound ?? undefined,
      });
   }

   private async verifyProductUpdate(cartId: number, productId: number, requestUser: User | null) {
      const cartFound = await this.show(cartId);
      if (cartFound.isFinished) throw new ForbiddenException(`${Cart.name} has been completed.`);

      const productFound = await this.ProductRepo.findOneBy({ id: productId });
      if (productFound === null) throw new NotFoundException(`${Product.name} not found.`);

      const userFound = await this.UserRepo.findOneBy({ email: requestUser?.email });

      const cartToModify = (await this.CartRepo.findOne({
         where: { id: cartFound.id },
         relations: { productToCart: true },
      })) as Cart;

      const productToCartDetail = {
         cart: cartFound,
         product: productFound,
      };

      const productToCartFound = await this.ProductToCartRepo.findOne({
         where: productToCartDetail,
         relations: { cart: true, product: true },
      });

      return {
         cartFound,
         productFound,
         userFound,
         cartToModify,
         productToCartFound,
      };
   }

   async subtractProduct(
      cartId: number,
      productId: number,
      requestUser: User | null,
      productQuantity = 1,
   ) {
      const { productFound, userFound, cartToModify, productToCartFound } =
         await this.verifyProductUpdate(cartId, productId, requestUser);

      let newProductToCart: ProductToCart;
      const newProductToCartList: ProductToCart[] = [...cartToModify.productToCart];

      if (productToCartFound)
         if (productToCartFound.count > productQuantity) {
            newProductToCart = await this.ProductToCartRepo.save({
               ...productToCartFound,
               count: productToCartFound.count - productQuantity,
            });

            const productToCartIndex = newProductToCartList.findIndex(
               (productToCart) =>
                  productToCart.cart === newProductToCart.cart &&
                  productToCart.product === newProductToCart.product,
            );

            if (productToCartIndex !== -1)
               newProductToCartList[productToCartIndex] = newProductToCart;
            else newProductToCartList.push(newProductToCart);
         } else if (productToCartFound.count === productQuantity)
            await this.ProductToCartRepo.delete(productToCartFound);
         else throw new ConflictException('This action cannot be performed');

      await this.CartRepo.save({
         ...cartToModify,
         total:
            cartToModify.total - (productToCartFound ? productFound.price * productQuantity : 0),
         productToCart: newProductToCartList,
         user: userFound ?? undefined,
      });
   }

   async checkOut(cartId: number, requestUser: User) {
      const cart = await this.show(cartId);

      const user = await this.UserRepo.findOneBy({ id: requestUser.id });
      if (user === null) throw new NotFoundException(`${User.name} not found.`);

      await this.CartRepo.save({ ...cart, isFinished: true, user });
   }

   async update(cartId: number, cartData: UpdateCartDTO) {
      const cart = await this.show(cartId);

      await this.CartRepo.save({ ...cart, ...cartData });
   }

   async delete(cartId: number) {
      await this.show(cartId);

      await this.CartRepo.softDelete(cartId);
   }
}
