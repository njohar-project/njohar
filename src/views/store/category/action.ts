import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { CategoryDto } from './../../dto/product/category';
import { SET_SELECTED_CATEGORY } from './reducers';

export function setSelectedCategory(selectedCategory: CategoryDto): ThunkAction<void, RootState, null> {
  return dispatch => {
    dispatch({ type: SET_SELECTED_CATEGORY, payload: selectedCategory })
  }
}