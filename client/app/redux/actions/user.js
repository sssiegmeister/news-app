import Util from '../../util';
import { push } from 'react-router-redux';
import axios from 'axios';

export const LOG_IN = 'LOG_IN';
export const SUCCESS_GET_CURR_USER = 'SUCCESS_GET_CURR_USER';
export const FAILED_GET_CURR_USER = 'FAILED_GET_CURR_USER';
export const GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER';
export const REGISTER = 'REGISTER';

function requestLogin(user) {
  return {
    type: LOG_IN,
    user
  };
}

function requestLoggedInUser() {
  console.log("Request logged in");
  return {
    type: GET_LOGGED_IN_USER
  };
}

function requestRegister(user) {
  return {
    type: REGISTER,
    user
  };
}

function successGetCurrentUser(user) {
  return {
    type: SUCCESS_GET_CURR_USER,
    user,
  };
}

function failedGetCurrentUser(error) {
  return {
    type: FAILED_GET_CURR_USER,
    error
  };
}

export function login(user) {
  return dispatch => {
    dispatch(requestLogin(user));
    return axios.post('/api/users/login', user)
      .then((result) => {
        dispatch(successGetCurrentUser(result.data));
      }, (err) => {
        dispatch(failedGetCurrentUser(err));
      });
  };
}

export function register(user) {
  return dispatch => {
    dispatch(requestRegister(user));
    return Util.register(user)
      .then((result) => {
        console.log(result);
        if (result) {
          return dispatch(successGetCurrentUser(result));
        } else {
          return dispatch(failedGetCurrentUser(result));
        }
      });
  };
}

export function getLoggedInUser() {
  return dispatch => {
    dispatch(requestLoggedInUser());
    return axios.get('/api/users/loggedIn')
      .then((result) => {
        if (result) {
          dispatch(successGetCurrentUser(result.data));
        } else {
          dispatch(failedGetCurrentUser({ message: 'Error fetching current user' }));
        }
      }).catch((error) => {
        throw (error);
      });
  };
}

export function save(userId, article) {
  return dispatch => {
    return axios.put('/api/users/save', {
      userId: userId,
      article: article
    }).then((result) => {
      dispatch(successGetCurrentUser(result.data));
    }, (err) => {
      console.log(err);
      alert("Error updating user:" + err);
    });
  };
}
