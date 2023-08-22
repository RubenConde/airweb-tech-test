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
    * It throws a `NotFoundException` if no product is found.
    *
    * @param {string} productId Identifier of the product to search
    * @param {User} requestUser User trying to update the information of the product
    * @returns {Promise<Product>} Information of the product
    */
   show(productId: number, requestUser: User | null): Promise<Product>;

   /**
    * Stores a new product in the database.
    *
    * It throws a `ConflictException` if the label of the new product is found in the database.
    *
    * @param {CreateProductDTO} productData Information to store in the product
    *
    * @returns {Promise<Product>} Information of the new product
    */
   store(productData: CreateProductDTO): Promise<Product>;

   /**
    * Updates the information from an product in the database.
    *
    * @param {string} productId Identifier of the product to update
    * @param {UpdateProductDTO} productData Information to update in the product
    *
    * @returns {Promise<void>} Updated information of the product
    */
   update(productId: number, productData: UpdateProductDTO): Promise<void>;

   /**
    * Deletes the product from the database.
    *
    * @param {string} productId Identifier of the product to delete
    *
    * @returns {Promise<void>} Information of the deleted product
    */
   delete(productId: number): Promise<void>;
}
