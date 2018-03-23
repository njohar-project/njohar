import gql from 'graphql-tag'
import Router from 'next/router'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthResultDto, LoginDto } from '../../dto/user/user'
import { setError } from '../../store/common/actions'
import { authorize } from '../../store/user/actions'

const LOGIN_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
        id
        name
        roles
      }
    }
  }
`

export const withLogin = compose(
  connect(),
  graphql<{ userLogin: AuthResultDto }, StoreProps>(LOGIN_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      login: (credential: LoginDto) =>
        mutate &&
        mutate({
          variables: credential
        }).then(result => {
          const { userLogin } = result.data
          ownProps.dispatch(authorize(userLogin))
          if (userLogin.user.roles.indexOf('sa') > -1) {
            Router.replace('/admin')
          } else {
            Router.replace('/')
          }
        }),

      error: bindActionCreators(setError, ownProps.dispatch)
    })
  })
)
