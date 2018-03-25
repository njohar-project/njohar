import { addCategory, deleteCategory, editCategory } from './mutations'
import { category } from './queries'

const map: GqlMap = {
  mutations: {
    addCategory,
    editCategory,
    deleteCategory
  },
  queries: {
    categories: category
  }
}

export default map
