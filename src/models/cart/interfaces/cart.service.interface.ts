import { Cart } from 'src/models/cart/entity/cart.entity';
import { CreateCartDTO, UpdateCartDTO } from 'src/models/cart/dto/cart.dto';

export interface BaseCartService {
   /**
    * Gets all the categories from the database.
    *
    * @returns {Promise<Cart[]>} List of categories
    */
   index(): Promise<Cart[]>;

   /**
    * Gets the information from a specific cart in the database.
    *
    * It throws a `NotFoundException` if no cart was found.
    *
    * @param {string} cartId Identifier of the cart to search
    * @returns {Promise<Cart>} Information of the cart
    */
   show(cartId: number): Promise<CartFiltered>;

   /**
    * Stores a new cart in the database.
    *
    * It throws a `UnauthorizedException` if the role of the new cart is `admin` and the role from
    * the cart performing the action is not.
    *
    * It throws a `ConflictException` if the email of the new cart was found in the database.
    *
    * @param {CreateCartDTO} cartData Information to store in the cart
    * @param {Cart | null} requestCart Possible cart trying to save a new cart
    *
    * @returns {Promise<Cart>} Information of the new cart
    */
   store(cartData: CreateCartDTO, requestCart: Cart | null): Promise<CartFiltered>;

   /**
    * Updates the information from an cart in the database.
    *
    * It throws a `UnauthorizedException` if the role of the cart to modify has changed and the cart
    * trying to modify it has no the `admin` role.
    *
    * @param {string} cartId Identifier of the cart to update
    * @param {UpdateCartDTO} cartData Information to update in the cart
    * @param {Cart} requestCart Cart trying to update the information of the cart
    *
    * @returns {Promise<Cart | null>} Updated information of the cart
    */
   update(cartId: number, cartData: UpdateCartDTO, requestCart: Cart): Promise<void>;

   /**
    * Deletes the cart from the database.
    *
    * @param {string} cartId Identifier of the cart to delete
    *
    * @returns {Promise<Cart | null>} Information of the deleted cart
    */
   delete(cartId: number): Promise<void>;
}
