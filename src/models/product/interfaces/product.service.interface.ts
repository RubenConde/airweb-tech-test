import { CreateProductDTO, UpdateProductDTO } from 'src/models/product/dto/product.dto';
import { Product } from 'src/models/product/entity/product.entity';
import { User } from 'src/models/user/entity/user.entity';

export interface BaseProductService {
   /**
    * Gets all the products from the database.
    *
    * @param {User} requestUser User trying to update the information of the product
    * @returns {Promise<Product[]>} List of products
    */
   index(requestUser: User | null): Promise<Product[]>;

   /**
    * Gets the information from a specific product in the database.
    *
    * It throws a `NotFoundException` if no product was found.
    *
    * @param {string} productId Identifier of the product to search
    * @param {User} requestUser User trying to update the information of the product
    * @returns {Promise<Product>} Information of the product
    */
   show(productId: number, requestUser: User | null): Promise<ProductFiltered>;

   /**
    * Stores a new product in the database.
    *
    * It throws a `UnauthorizedException` if the role of the new product is `admin` and the role from
    * the product performing the action is not.
    *
    * It throws a `ConflictException` if the email of the new product was found in the database.
    *
    * @param {CreateProductDTO} productData Information to store in the product
    * @param {Product | null} requestProduct Possible product trying to save a new product
    *
    * @returns {Promise<Product>} Information of the new product
    */
   store(productData: CreateProductDTO): Promise<ProductFiltered>;

   /**
    * Updates the information from an product in the database.
    *
    * It throws a `UnauthorizedException` if the role of the product to modify has changed and the product
    * trying to modify it has no the `admin` role.
    *
    * @param {string} productId Identifier of the product to update
    * @param {UpdateProductDTO} productData Information to update in the product
    *
    * @returns {Promise<Product | null>} Updated information of the product
    */
   update(productId: number, productData: UpdateProductDTO): Promise<void>;

   /**
    * Deletes the product from the database.
    *
    * @param {string} productId Identifier of the product to delete
    *
    * @returns {Promise<Product | null>} Information of the deleted product
    */
   delete(productId: number): Promise<void>;
}
