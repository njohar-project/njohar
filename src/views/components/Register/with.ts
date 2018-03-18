import gql from 'graphql-tag'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthResultDto, RegisterDto } from '../../dto/user/user'
import { setError } from '../../store/common/actions'
import { authorize } from '../../store/user/actions'

const REGISTER_MUTATION = gql`
  mutation($name: String!, $username: String!, $password: String!) {
    userRegister(name: $name, username: $username, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`

export const withRegister = compose(
  connect(),
  graphql<{}, StoreProps>(REGISTER_MUTATION, {
    props: ({ mutate, ownProps }) => ({
      register: (variables: RegisterDto) =>
        mutate &&
        mutate({
          variables,
          update: (proxy, result) => {
            if (result.data) {
              const data: AuthResultDto = result.data.userRegister
              ownProps.dispatch(authorize(data))
            }
          }
        }),
        
      error: bindActionCreators(setError, ownProps.dispatch)
    })
  })
)
