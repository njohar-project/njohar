import { Context } from 'koa'
import { CategoryModel } from '../dataAccess'
import { Repository } from '../repository'
import { CreateCategoryDto } from './../../views/dto/product/category'

export class CategoryService {
  ctx: Context
  categories = new Repository(CategoryModel)

  constructor(ctx: Context) {
    this.ctx = ctx
  }
  async add(request: CreateCategoryDto): Promise<string> {
    const category = await this.categories.create({
      name: request.name
    })
    return category._id
  }
}
