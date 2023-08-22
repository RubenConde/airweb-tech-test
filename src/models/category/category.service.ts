import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/models/category/dto/category.dto';
import { Category } from 'src/models/category/entity/category.entity';
import { BaseCategoryService } from 'src/models/category/interfaces/category.service.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements BaseCategoryService {
   constructor(@InjectRepository(Category) private CategoryRepo: Repository<Category>) {}

   async index() {
      const categoryList = await this.CategoryRepo.find({
         relations: {
            products: false,
         },
         select: {
            deletedAt: false,
            description: true,
            id: true,
            index: true,
            label: true,
         },
      });

      return categoryList;
   }

   async show(categoryId: number) {
      const categoryFound = await this.CategoryRepo.findOne({
         relations: {
            products: false,
         },
         select: {
            deletedAt: false,
            description: true,
            id: true,
            index: true,
            label: true,
         },
         where: {
            id: categoryId,
         },
      });

      if (categoryFound === null) throw new NotFoundException(`${Category.name} not found.`);

      return categoryFound;
   }

   async store(categoryData: CreateCategoryDTO) {
      const categoryFound = await this.CategoryRepo.findOne({
         where: {
            label: categoryData.label,
         },
         withDeleted: true,
      });

      if (categoryFound)
         throw new ConflictException('There is already a category with this label.');

      const newCategory = await this.CategoryRepo.save(categoryData);

      const category = await this.show(newCategory.id);

      return category;
   }

   async update(categoryId: number, categoryData: UpdateCategoryDTO) {
      await this.show(categoryId);

      const category = await this.CategoryRepo.findOneBy({ id: categoryId });

      await this.CategoryRepo.save({ ...category, ...categoryData });
   }

   async delete(categoryId: number) {
      await this.show(categoryId);

      await this.CategoryRepo.softDelete(categoryId);
   }
}
