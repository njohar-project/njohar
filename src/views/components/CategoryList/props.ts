import { QueryProps } from 'react-apollo'
import { CategoryDto } from './../../dto/product/category'

export interface CategoryListResponse {
  categories: CategoryDto[]
}
export interface CategoryListActionProps {
  setSelectedCategory(category: CategoryDto): void
}

export type CategoryListProps = CategoryListResponse & QueryProps & CategoryListActionProps
