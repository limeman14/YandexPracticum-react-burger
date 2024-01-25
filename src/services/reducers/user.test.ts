import { userInitialState, userReducer } from './user'
import { UserInfo } from '../../utils/types/api'
import { UserAction } from '../../utils/types/actions/user'

describe('UserReducer Tests', () => {
  const user: UserInfo = { 
    email: 'test@example.com',
    name: 'Test User'
  }

  it('should handle unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' }
    const initialState = { ...userInitialState }

    // @ts-ignore
    expect(userReducer(initialState, action)).toEqual({
      ...initialState
    })
  })
  
  it('should handle LOGIN_REQUEST', () => {
    const action: UserAction = { type: 'LOGIN_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      loginRequest: true
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    const action: UserAction = { type: 'LOGIN_SUCCESS', user }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      loginRequest: false,
      loginError: false,
      user,
      isAuthenticated: true
    })
  })

  it('should handle LOGIN_ERROR', () => {
    const action: UserAction = { type: 'LOGIN_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      loginRequest: false,
      loginError: true
    })
  })

  it('should handle GET_USER_REQUEST', () => {
    const action: UserAction = { type: 'GET_USER_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      getUserRequest: true
    })
  })
  
  it('should handle GET_USER_SUCCESS', () => {
    const action: UserAction = { type: 'GET_USER_SUCCESS', user }
    
    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      getUserRequest: false,
      getUserError: false,
      user,
      isAuthenticated: true
    })
  })

  it('should handle GET_USER_ERROR', () => {
    const action: UserAction = { type: 'GET_USER_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      getUserRequest: false,
      getUserError: true
    })
  })

  it('should handle UPDATE_USER_REQUEST', () => {
    const action: UserAction = { type: 'UPDATE_USER_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      updateUserRequest: true
    })
  })

  it('should handle UPDATE_USER_SUCCESS', () => {
    const updatedUser = { email: 'test@example.com', name: 'Updated Test User' }
    const action: UserAction = { type: 'UPDATE_USER_SUCCESS', user: updatedUser }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      updateUserRequest: false,
      updateUserError: false,
      user: updatedUser
    })
  })

  it('should handle UPDATE_USER_ERROR', () => {
    const action: UserAction = { type: 'UPDATE_USER_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      updateUserRequest: false,
      updateUserError: true
    })
  })

  it('should handle LOGOUT_REQUEST', () => {
    const action: UserAction = { type: 'LOGOUT_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      logoutRequest: true
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    const action: UserAction = { type: 'LOGOUT_SUCCESS' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      isAuthenticated: false,
      user: {
        email: '',
        name: ''
      },
      logoutRequest: false,
      logoutError: false
    })
  })

  it('should handle LOGOUT_ERROR', () => {
    const action: UserAction = { type: 'LOGOUT_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      logoutRequest: false,
      logoutError: true
    })
  })

  it('should handle REGISTER_REQUEST', () => {
    const action: UserAction = { type: 'REGISTER_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      registerRequest: true
    })
  })

  it('should handle REGISTER_SUCCESS', () => {
    const action: UserAction = { type: 'REGISTER_SUCCESS', user }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      registerRequest: false,
      registerError: false,
      user,
      isAuthenticated: true
    })
  })

  it('should handle REGISTER_ERROR', () => {
    const action: UserAction = { type: 'REGISTER_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      registerRequest: false,
      registerError: true
    })
  })

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    const action: UserAction = { type: 'FORGOT_PASSWORD_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      forgotPasswordRequest: true,
      isPasswordResetSuccess: false
    })
  })

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const action: UserAction = { type: 'FORGOT_PASSWORD_SUCCESS' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      forgotPasswordRequest: false,
      forgotPasswordError: false,
      isPasswordResetting: true
    })
  })

  it('should handle FORGOT_PASSWORD_ERROR', () => {
    const action: UserAction = { type: 'FORGOT_PASSWORD_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      forgotPasswordRequest: false,
      forgotPasswordError: true
    })
  })

  it('should handle RESET_PASSWORD_REQUEST', () => {
    const action: UserAction = { type: 'RESET_PASSWORD_REQUEST' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      resetPasswordRequest: true
    })
  })

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const action: UserAction = { type: 'RESET_PASSWORD_SUCCESS' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      resetPasswordRequest: false,
      resetPasswordError: false,
      isPasswordResetting: false,
      isPasswordResetSuccess: true
    })
  })

  it('should handle RESET_PASSWORD_ERROR', () => {
    const action: UserAction = { type: 'RESET_PASSWORD_ERROR' }

    expect(userReducer(userInitialState, action)).toEqual({
      ...userInitialState,
      resetPasswordRequest: false,
      resetPasswordError: true
    })
  })
})