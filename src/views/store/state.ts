import { CategoryState } from './category/state';

import { CommonState } from './common/state'
import { UserState } from './user/state'

export interface RootState {
  users: UserState
  common: CommonState
  category: CategoryState
}
