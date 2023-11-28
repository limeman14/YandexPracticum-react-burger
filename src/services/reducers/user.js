import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/user'

const userInitialState = {
  user: {
    email: '',
    name: ''
  },
  isAuthenticated: false,
  loginRequest: false,
  loginError: false,

  registerRequest: false,
  registerError: false
}

export const userReducer = (state = userInitialState, action) => {
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
    default:
      return state
  }
}

