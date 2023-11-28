import { loginRequest, registerRequest } from '../../utils/api'
import { setCookie } from '../../utils/cookies'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

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
      setCookie('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
    }).catch(err => {
      dispatch({
        type: LOGIN_ERROR
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
      setCookie('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
    }).catch(err => {
      dispatch({
        type: REGISTER_ERROR
      })
      console.error(err)
    })
  }
}