import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import { SET_ERROR, SET_LANG } from './reducers'

export function setError(
  error: ErrorMessage
): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_ERROR, payload: error })
  }
}

export function changeLanguage(
  language: string
): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_LANG, payload: language })
  }
}
