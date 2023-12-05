import {
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserRequest
} from '../../utils/api'
import { setCookie } from '../../utils/cookies'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

function saveTokens (res) {
  setCookie('accessToken', res.accessToken)
  localStorage.setItem('refreshToken', res.refreshToken)
}

export function login (email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    })
    loginRequest(email, password).then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        user: res.user
      })
      saveTokens(res)
    }).catch(err => {
      dispatch({
        type: LOGIN_ERROR
      })
      console.error(err)
    })
  }
}

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    })
    getUserRequest().then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user,
      })
    }).catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(getUser()));
      } else {
        dispatch({
          type: GET_USER_ERROR
        })
        console.error(err)
      }
    })
  }
}

export function updateUser (newValues) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    updateUserRequest(newValues).then(res => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.user,
      })
    }).catch(err => {
      if (err.message === 'jwt expired') {
        dispatch(refreshToken(updateUser(newValues)));
      } else {
        dispatch({
          type: UPDATE_USER_ERROR
        })
        console.error(err)
      }
    })
  }
}

const refreshToken = (nextAction) => (dispatch) => {
  refreshTokenRequest().then(res => {
    saveTokens(res)
    dispatch(nextAction)
  })
}

export function logout () {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    })
    logoutRequest().then(_ => {
      dispatch({
        type: LOGOUT_SUCCESS
      })
      setCookie('accessToken', '', { expires: -1 })
      localStorage.removeItem('refreshToken')
    }).catch(err => {
      dispatch({
        type: LOGOUT_ERROR
      })
      console.error(err)
    })
  }
}

export function register (form) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    })
    registerRequest(form).then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        user: res.user
      })
      saveTokens(res)
    }).catch(err => {
      dispatch({
        type: REGISTER_ERROR
      })
      console.error(err)
    })
  }
}

export function forgotPassword (email) {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    })
    forgotPasswordRequest(email).then(_ => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS
      })
    }).catch(err => {
      dispatch({
        type: FORGOT_PASSWORD_ERROR
      })
      console.error(err)
    })
  }
}

export function resetPassword (form) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    })
    resetPasswordRequest(form).then(_ => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS
      })
    }).catch(err => {
      dispatch({
        type: RESET_PASSWORD_ERROR
      })
      console.error(err)
    })
  }
}