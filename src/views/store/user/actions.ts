import { ThunkAction } from 'redux-thunk'
import { JWT_KEY } from '../../../lib/constants'
import { AuthResultDto, UserDto } from '../../dto/user/user'
import { CookieUtil } from '../../lib'
import { RootState } from '../state'
import { SET_USER } from './reducers'

export function setUser(user: UserDto): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_USER, payload: user })
  }
}

export function authorize(
  data: AuthResultDto
): ThunkAction<void, RootState, null> {
  return async dispatch => {
    CookieUtil.setCookie(JWT_KEY, data.token, 365)
    dispatch({ type: SET_USER, payload: data.user })
  }
}

export function logout(): ThunkAction<void, RootState, null> {
  return async dispatch => {
    dispatch({ type: SET_USER, payload: null })
    CookieUtil.deleteCookie(JWT_KEY)
  }
}
