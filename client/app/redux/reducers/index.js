import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  isFetchingCurrentUser,
  errorFetchingCurrentUser,
  currentUser,
} from './user.reducer';

const rootReducers = combineReducers({
  isFetchingCurrentUser,
  errorFetchingCurrentUser,
  currentUser
});

export default rootReducers;
