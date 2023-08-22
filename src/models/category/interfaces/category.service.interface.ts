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
    * It throws a `NotFoundException` if no category is found.
    *
    * @param {number} categoryId Identifier of the category to search
    *
    * @returns {Promise<Category>} Information of the category
    */
   show(categoryId: number): Promise<Category>;

   /**
    * Stores a new category in the database.
    *
    * It throws a `ConflictException` if the label of the new category is found in the database.
    *
    * @param {CreateCategoryDTO} categoryData Information to store in the category
    *
    * @returns {Promise<Category>} Information of the new category
    */
   store(categoryData: CreateCategoryDTO): Promise<Category>;

   /**
    * Updates the information from an category in the database.
    *
    * @param {number} categoryId Identifier of the category to update
    * @param {UpdateCategoryDTO} categoryData Information to update in the category
    *
    * @returns {Promise<void>} Updated information of the category
    */
   update(categoryId: number, categoryData: UpdateCategoryDTO): Promise<void>;

   /**
    * Deletes the category from the database.
    *
    * @param {number} categoryId Identifier of the category to delete
    *
    * @returns {Promise<void>} Information of the deleted category
    */
   delete(categoryId: number): Promise<void>;
}
