
import {
  LOG_IN,
  GET_LOGGED_IN_USER,
  REGISTER,
  FAILED_GET_CURR_USER,
  SUCCESS_GET_CURR_USER
} from '../actions/user';

export function isFetchingCurrentUser(state, action) {
  switch (action.type) {
    case GET_LOGGED_IN_USER:
    case REGISTER:
    case LOG_IN:
      return true;
    default:
      return false;
  }
}

export function errorFetchingCurrentUser(state, action) {
  switch (action.type) {
    case FAILED_GET_CURR_USER:
      return action.error;
    default:
      return null;
  }
}

export function currentUser(state, action) {
  switch (action.type) {
    case SUCCESS_GET_CURR_USER:
      return action.user;
    default:
      return state === undefined ? null : state;
  }
}
