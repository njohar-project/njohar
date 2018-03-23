import gql from 'graphql-tag'
import Router from 'next/router'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthResultDto, RegisterDto } from '../../dto/user/user'
import { setError } from '../../store/common/actions'
import { authorize } from '../../store/user/actions'

const REGISTER_MUTATION = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $roles: [String!]
  ) {
    userRegister(
      name: $name
      email: $email
      password: $password
      roles: $roles
    ) {
      token
      user {
        id
        name
        roles
      }
    }
  }
`

export const withRegister = compose(
  connect(),
  graphql<{ userRegister: AuthResultDto }, StoreProps>(REGISTER_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      register: (variables: RegisterDto) =>
        mutate &&
        mutate({
          variables
        }).then(result => {
          if (result.data) {
            const data: AuthResultDto = result.data.userRegister
            ownProps.dispatch(authorize(data))
            if (data.user.roles.indexOf('sa') > -1) {
              Router.replace('/admin')
            } else {
              Router.replace('/')
            }
          }
        }),

      error: bindActionCreators(setError, ownProps.dispatch)
    })
  })
)
