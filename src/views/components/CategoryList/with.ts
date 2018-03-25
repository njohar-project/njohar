import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setSelectedCategory } from '../../store/category/action'
import { CategoryListProps, CategoryListResponse } from './props'

export const CATEGORY_QUERY = gql`
  query {
    categories {
      id
      name
    }
  }
`

export const withCategoryList = compose(
  connect(),
  graphql<CategoryListResponse, StoreProps, CategoryListProps>(CATEGORY_QUERY, {
    props: ({ data, ownProps }) => ({
      ...data,
      setSelectedCategory: bindActionCreators(
        setSelectedCategory,
        ownProps.dispatch
      )
    })
  })
)
