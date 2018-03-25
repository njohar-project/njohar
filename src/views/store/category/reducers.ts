import { Reducer } from 'redux'
import { CategoryState } from './state'

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
export const SET_MODAL_CATEGORY = 'SET_MODAL_CATEGORY'

const initialState: CategoryState = {
  selectedCategory: undefined
}

export const categoryReducer: Reducer<CategoryState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.payload }

    default:
      return state
  }
}
