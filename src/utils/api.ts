import { getCookie } from './cookies'
import { ProfileForm, ProfileFormEdit, ResetPasswordForm } from './types/common'
import {
  CreateOrderResponse,
  GetIngredientsResponse,
  GetOrderByIdResponse,
  LoginResponse,
  RegisterResponse,
  TokensInfoResponse,
  UserInfoResponse
} from './types/api'

const BASE_NORMA_API_URL = 'https://norma.nomoreparties.space/api'
export const WEB_SOCKET_BASE_API_URL = 'wss://norma.nomoreparties.space/orders'

const checkResponse = <RespType>(res: Response): Promise<RespType> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
}

async function request<RespType> (endpoint: string, options?: RequestInit): Promise<RespType> {
  const res = await fetch(`${BASE_NORMA_API_URL}/${endpoint}`, options)
  return checkResponse<RespType>(res)
}

export function getIngredientsRequest () {
  return request<GetIngredientsResponse>('ingredients')
}

export function createOrderRequest (ingredientIds: ReadonlyArray<string>) {
  return request<CreateOrderResponse>('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')!
    },
    body: JSON.stringify({ ingredients: ingredientIds })
  })
}

export function loginRequest (email: string, password: string) {
  return request<LoginResponse>('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export function getUserRequest () {
  return request<UserInfoResponse>('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')!
    }
  })
}

export function updateUserRequest (newValues: ProfileFormEdit) {
  return request<UserInfoResponse>('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')!
    },
    body: JSON.stringify({ ...newValues })
  })
}

export function refreshTokenRequest () {
  return request<TokensInfoResponse>('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
}

export function logoutRequest () {
  return request<void>('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') ?? '' })
  })
}

export function registerRequest (form: ProfileForm) {
  return request<RegisterResponse>('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
}

export function forgotPasswordRequest (email: string) {
  return request<void>('password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
}

export function resetPasswordRequest (form: ResetPasswordForm) {
  return request<void>('password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
}

export function getOrderByIdRequest (id: string) {
  return request<GetOrderByIdResponse>(`orders/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}