import { Reducer } from 'redux'
import { UserState } from './state'

export const SET_USER = 'SET_USER'

const initialState: UserState = {
  authenticated: false,
  user: undefined
}

export const userReducers: Reducer<UserState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER:
      const authenticated = !!action.payload
      return { ...state, user: action.payload, authenticated }
    default:
      return state
  }
}
