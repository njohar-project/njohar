import { ThunkAction } from 'redux-thunk'
import { RootState } from '..'
import {
  SET_ADMIN_SIDEBAR_COLLAPSED,
  SET_ERROR,
  SET_FRESH,
  SET_LANG
} from './reducers'

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

export function setFresh(fresh: boolean): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_FRESH, payload: fresh })
  }
}

export function setAdminSidebarCollapse(
  collapse: boolean
): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_ADMIN_SIDEBAR_COLLAPSED, payload: collapse })
  }
}
