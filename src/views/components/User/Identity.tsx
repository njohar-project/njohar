import * as React from 'react'
import { connect } from 'react-redux'
import { UserDto } from '../../dto/user/user'
import { RootState } from '../../store'

interface UserIdentityProps {
  user?: UserDto
}

export class UserIdentityCls extends React.PureComponent<UserIdentityProps> {
  render() {
    return (
      <div>
        <h2>{this.props.user && this.props.user.name}</h2>
      </div>
    )
  }
}

export const UserIdentity = connect<UserIdentityProps>((state: RootState) => ({
  user: state.users.user
}))(UserIdentityCls)
