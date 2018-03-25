import { Context } from 'koa'
import { CategoryModel } from '../dataAccess'
import { Repository } from '../repository'
import {
  CategoryDto,
  CreateCategoryDto
} from './../../views/dto/product/category'

export class CategoryService {
  ctx: Context
  categories = new Repository(CategoryModel)

  constructor(ctx: Context) {
    this.ctx = ctx
  }
  async add(request: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.categories.create({
      name: request.name
    })
    return {
      id: category._id,
      name: category.name
    }
  }
  async edit(request: CategoryDto): Promise<CategoryDto> {
    const category = await this.categories.edit(request.id, {
      name: request.name
    })
    return {
      id: category._id,
      name: category.name
    }
  }
  async delete(id: string): Promise<void> {
    this.categories.delete(id)
  }
  async list(): Promise<CategoryDto[]> {
    const categories = await this.categories
      .query()

    return categories.map<CategoryDto>(p => {
      return {
        id: p._id,
        name: p.name
      }
    })
  }
}
