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
} from '../../../services/actions/user'
import { UserInfo } from '../api'

type LoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST
}
type LoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS
  readonly user: UserInfo
}
type LoginErrorAction = {
  readonly type: typeof LOGIN_ERROR
}
type GetUserRequestAction = {
  readonly type: typeof GET_USER_REQUEST
}
type GetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS
  readonly user: UserInfo
}
type GetUserErrorAction = {
  readonly type: typeof GET_USER_ERROR
}
type UpdateUserRequestAction = {
  readonly type: typeof UPDATE_USER_REQUEST
}
type UpdateUserSuccessAction = {
  readonly type: typeof UPDATE_USER_SUCCESS
  readonly user: UserInfo
}
type UpdateUserErrorAction = {
  readonly type: typeof UPDATE_USER_ERROR
}
type LogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST
}
type LogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS
}
type LogoutErrorAction = {
  readonly type: typeof LOGOUT_ERROR
}
type RegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST
}
type RegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS
  readonly user: UserInfo
}
type RegisterErrorAction = {
  readonly type: typeof REGISTER_ERROR
}
type ForgotPasswordRequestAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}
type ForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}
type ForgotPasswordErrorAction = {
  readonly type: typeof FORGOT_PASSWORD_ERROR
}
type ResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST
}
type ResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}
type ResetPasswordErrorAction = {
  readonly type: typeof RESET_PASSWORD_ERROR
}

export type UserAction =
  LoginRequestAction |
  LoginSuccessAction |
  LoginErrorAction |
  GetUserRequestAction |
  GetUserSuccessAction |
  GetUserErrorAction |
  UpdateUserRequestAction |
  UpdateUserSuccessAction |
  UpdateUserErrorAction |
  LogoutRequestAction |
  LogoutSuccessAction |
  LogoutErrorAction |
  RegisterRequestAction |
  RegisterSuccessAction |
  RegisterErrorAction |
  ForgotPasswordRequestAction |
  ForgotPasswordSuccessAction |
  ForgotPasswordErrorAction |
  ResetPasswordRequestAction |
  ResetPasswordSuccessAction |
  ResetPasswordErrorAction