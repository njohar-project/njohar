import { FormComponentProps } from 'antd/lib/form'
import { CategoryDto, CreateCategoryDto } from './../../dto/product/category'

export interface MutationProps {
  addCategory(categoryToAdd: CreateCategoryDto): CategoryDto
  error(error: ErrorMessage): void
}
export interface CategoryAddOwnProps {
  modalVisible: boolean
  onModalHide: () => void
}

export type CategoryAddProps = MutationProps &
  WithLangProps &
  FormComponentProps &  
  CategoryAddOwnProps
