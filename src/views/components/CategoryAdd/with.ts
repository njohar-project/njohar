import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setError } from '../../store/common/actions'
import { CategoryListResponse } from '../CategoryList/props';
import { CATEGORY_QUERY } from '../CategoryList/with';
import { CreateCategoryDto } from './../../dto/product/category'

const CATEGORY_MUTATION = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`

export const withCategory = compose(
  connect(),
  graphql<{}, StoreProps>(CATEGORY_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      addCategory: (categoryToAdd: CreateCategoryDto) =>
        mutate &&
        mutate({
          variables: categoryToAdd,
          update: (proxy, result) => {
            // agar supaya bisa update ditable otomatis setelah add
            // Mencari data sebelumnya mengunakan kunci query
            const data = proxy.readQuery<CategoryListResponse>({ 
              query: CATEGORY_QUERY 
            })

            if (!result || !result.data || !data) {
              throw new Error('Data is not resolved.')
            }
            proxy.writeQuery({
              query: CATEGORY_QUERY,
              data: {
                ...data,
                categories: [result.data.addCategory, ...data.categories]
              }
            })
          }
        }),

      error: bindActionCreators(setError, ownProps.dispatch)
    })
  })
)
