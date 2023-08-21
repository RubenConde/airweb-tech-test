import { Category } from 'src/models/category/entity/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/models/category/dto/category.dto';

export interface BaseCategoryService {
   /**
    * Gets all the categories from the database.
    *
    * @returns {Promise<Category[]>} List of categories
    */
   index(): Promise<Category[]>;

   /**
    * Gets the information from a specific category in the database.
    *
    * It throws a `NotFoundException` if no category was found.
    *
    * @param {string} categoryId Identifier of the category to search
    * @returns {Promise<Category>} Information of the category
    */
   show(categoryId: string): Promise<CategoryFiltered>;

   /**
    * Stores a new category in the database.
    *
    * It throws a `UnauthorizedException` if the role of the new category is `admin` and the role from
    * the category performing the action is not.
    *
    * It throws a `ConflictException` if the email of the new category was found in the database.
    *
    * @param {UrlDTO} categoryData Information to store in the category
    * @param {Category | null} requestCategory Possible category trying to save a new category
    *
    * @returns {Promise<Category>} Information of the new category
    */
   store(
      categoryData: CreateCategoryDTO,
      requestCategory: Category | null,
   ): Promise<CategoryFiltered>;

   /**
    * Updates the information from an category in the database.
    *
    * It throws a `UnauthorizedException` if the role of the category to modify has changed and the category
    * trying to modify it has no the `admin` role.
    *
    * @param {string} categoryId Identifier of the category to update
    * @param {UrlDTO} categoryData Information to update in the category
    * @param {Category} requestCategory Category trying to update the information of the category
    *
    * @returns {Promise<Category | null>} Updated information of the category
    */
   update(
      categoryId: string,
      categoryData: UpdateCategoryDTO,
      requestCategory: Category,
   ): Promise<void>;

   /**
    * Deletes the category from the database.
    *
    * @param {string} categoryId Identifier of the category to delete
    *
    * @returns {Promise<Category | null>} Information of the deleted category
    */
   delete(categoryId: string): Promise<void>;
}
