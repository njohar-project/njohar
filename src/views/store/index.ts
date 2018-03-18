import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { commonReducers } from './common/reducers'
import { RootState } from './state'
import { userReducers } from './user/reducers'

const reducer = combineReducers<RootState>({
  users: userReducers,
  common: commonReducers
})

export const initStore = (initialState: RootState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk))
}

export { RootState }
