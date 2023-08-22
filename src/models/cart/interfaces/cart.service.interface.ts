import { Cart } from 'src/models/cart/entity/cart.entity';
import { CreateCartDTO, UpdateCartDTO } from 'src/models/cart/dto/cart.dto';

export interface BaseCartService {
   /**
    * Gets all the carts from the database.
    *
    * @returns {Promise<Cart[]>} List of carts
    */
   index(): Promise<Cart[]>;

   /**
    * Gets the information from a specific cart in the database.
    *
    * It throws a `NotFoundException` if no cart is found.
    *
    * @param {number} cartId Identifier of the cart to search
    * @returns {Promise<Cart>} Information of the cart
    */
   show(cartId: number): Promise<Cart>;

   /**
    * Stores a new cart in the database.
    *
    * @param {CreateCartDTO} cartData Information to store in the cart
    * @param {Cart | null} requestCart Possible cart trying to save a new cart
    *
    * @returns {Promise<Cart>} Information of the new cart
    */
   store(cartData: CreateCartDTO, requestCart: Cart | null): Promise<Cart>;

   /**
    * Updates the information from an cart in the database.
    *
    * @param {number} cartId Identifier of the cart to update
    * @param {UpdateCartDTO} cartData Information to update in the cart
    * @param {Cart} requestCart Cart trying to update the information of the cart
    *
    * @returns {Promise<void>} Updated information of the cart
    */
   update(cartId: number, cartData: UpdateCartDTO, requestCart: Cart): Promise<void>;

   /**
    * Deletes the cart from the database.
    *
    * @param {number} cartId Identifier of the cart to delete
    *
    * @returns {Promise<void>} Information of the deleted cart
    */
   delete(cartId: number): Promise<void>;
}
