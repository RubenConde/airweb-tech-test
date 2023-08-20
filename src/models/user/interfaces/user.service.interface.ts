import { CreateUserDTO, UpdateUserDTO } from 'src/models/user/dto/user.dto';
import { User } from 'src/models/user/entity/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

export interface BaseUserService {
   /**
    * Gets all the users from the database.
    *
    * @returns {Promise<User[]>} List of users
    */
   index(): Promise<User[]>;

   /**
    * Gets the information from a specific user in the database.
    *
    * It throws a `NotFoundException` if no user was found.
    *
    * @param {string} userId Identifier of the user to search
    * @returns {Promise<User>} Information of the user
    */
   show(userId: string): Promise<UserFiltered>;

   /**
    * Stores a new user in the database.
    *
    * It throws a `UnauthorizedException` if the role of the new user is `admin` and the role from
    * the user performing the action is not.
    *
    * It throws a `ConflictException` if the email of the new user was found in the database.
    *
    * @param {UrlDTO} userData Information to store in the user
    * @param {User | null} requestUser Possible user trying to save a new user
    *
    * @returns {Promise<User>} Information of the new user
    */
   store(userData: CreateUserDTO, requestUser: User | null): Promise<UserFiltered>;

   /**
    * Updates the information from an user in the database.
    *
    * It throws a `UnauthorizedException` if the role of the user to modify has changed and the user
    * trying to modify it has no the `admin` role.
    *
    * @param {string} userId Identifier of the user to update
    * @param {UrlDTO} userData Information to update in the user
    * @param {User} requestUser User trying to update the information of the user
    *
    * @returns {Promise<User | null>} Updated information of the user
    */
   update(userId: string, userData: UpdateUserDTO, requestUser: User): Promise<void>;

   /**
    * Deletes the user from the database.
    *
    * @param {string} userId Identifier of the user to delete
    *
    * @returns {Promise<User | null>} Information of the deleted user
    */
   delete(userId: string): Promise<void>;

   /**
    * Generates a JWT token based in the user information, so the user can use it to perform actions
    * in the system.
    *
    * @param {User} userData Information of user to validate
    *
    * @returns {Promise<UserWithToken>} Information of the user with the JWT token
    */
   signIn(userData: User): Promise<UserWithToken>;

   /**
    * Finds an user by the email and compares its password with the one in the database
    *
    * It throws a `NotFoundException` if no user was found.
    *
    * It throws a `UnauthorizedException` if the password do not match.
    *
    * @param {string} email Email of the user
    * @param {string} password Password of the user
    * @returns {Promise<User>} Information of the user
    */
   validateUser(email: string, password: string): Promise<User>;
}
