import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthResultDto, LoginDto } from '../../dto/user/user'
import { setError } from '../../store/common/actions'
import { authorize } from '../../store/user/actions'

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    userLogin(username: $username, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

export const withLogin = compose(
  connect(),  
  graphql<{}, StoreProps>(LOGIN_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      login: (credential: LoginDto) =>
        mutate &&
        mutate({
          variables: credential,
          update: (proxy, result) => {
            if (result.data) {
              const data: AuthResultDto = result.data.userLogin
              ownProps.dispatch(authorize(data))
            }
          }
        }),

      error: bindActionCreators(setError, ownProps.dispatch)
    })
  })
)
