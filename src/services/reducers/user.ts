import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../actions/user'
import { UserAction } from '../../utils/types/actions/user'
import { UserInfo } from '../../utils/types/api'

type UserState = {
  user: UserInfo | {}
  isAuthenticated: boolean
  loginRequest: boolean
  loginError: boolean
  getUserRequest: boolean
  getUserError: boolean
  updateUserRequest: boolean
  updateUserError: boolean
  logoutRequest: boolean
  logoutError: boolean

  registerRequest: boolean
  registerError: boolean

  forgotPasswordRequest: boolean
  forgotPasswordError: boolean
  isPasswordResetting: boolean
  resetPasswordRequest: boolean
  resetPasswordError: boolean
  isPasswordResetSuccess: boolean
}
const userInitialState: UserState = {
  user: {
    email: '',
    name: ''
  },
  isAuthenticated: false,
  loginRequest: false,
  loginError: false,
  getUserRequest: false,
  getUserError: false,
  updateUserRequest: false,
  updateUserError: false,
  logoutRequest: false,
  logoutError: false,

  registerRequest: false,
  registerError: false,

  forgotPasswordRequest: false,
  forgotPasswordError: false,
  isPasswordResetting: false,
  resetPasswordRequest: false,
  resetPasswordError: false,
  isPasswordResetSuccess: false
}

export const userReducer = (state = userInitialState, action: UserAction): UserState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginError: false,
        loginRequest: false,
        user: action.user,
        isAuthenticated: true
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loginRequest: false,
        loginError: true
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: false,
        user: action.user,
        isAuthenticated: true
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserRequest: false,
        getUserError: true
      }
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserError: false,
        user: action.user
      }
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        updateUserError: true,
        updateUserRequest: false
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        logoutRequest: false,
        logoutError: false
      }
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutRequest: false,
        logoutError: true
      }
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerError: false,
        user: action.user,
        isAuthenticated: true
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        registerRequest: false,
        registerError: true
      }
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        isPasswordResetSuccess: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: false,
        isPasswordResetting: true
      }
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordError: true
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: false,
        isPasswordResetting: false,
        isPasswordResetSuccess: true
      }
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordError: true
      }
    }
    default:
      return state
  }
}

