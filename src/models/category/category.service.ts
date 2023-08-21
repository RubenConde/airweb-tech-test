import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateCategoryDTO, UpdateCategoryDTO } from 'src/models/category/dto/category.dto';
import { BaseCategoryService } from 'src/models/category/interfaces/category.service.interface';
import { Category } from 'src/models/category/entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class CategoryService implements BaseCategoryService {
   constructor(@InjectRepository(Category) private CategoryRepo: Repository<Category>) {}

   async index() {
      const categoryList = await this.CategoryRepo.find();

      return categoryList;
   }

   async show(categoryId: string) {
      const category = await this.CategoryRepo.findOneBy({ id: categoryId }).then(
         (foundCategory) => {
            if (foundCategory === null) throw new NotFoundException(`${Category.name} not found`);
            const { id, ...filteredCategory } = foundCategory;
            return filteredCategory;
         },
      );

      return category;
   }

   async store(categoryData: CreateCategoryDTO) {
      const isAlreadyCreated = await this.CategoryRepo.findOneBy({ label: categoryData.label });

      if (isAlreadyCreated) throw new ConflictException('Category already exists');

      const { ...categoryInfo } = categoryData;

      const newCategory = await this.CategoryRepo.save(categoryInfo);

      const category = await this.show(newCategory.id);

      return category;
   }

   async update(categoryId: string, categoryData: UpdateCategoryDTO) {
      await this.show(categoryId);

      const category = await this.CategoryRepo.findOneBy({ id: categoryId });

      await this.CategoryRepo.save({ id: categoryId, ...category, ...categoryData });
   }

   async delete(categoryId: string) {
      await this.show(categoryId);

      await this.CategoryRepo.delete(categoryId);
   }
}
