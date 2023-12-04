import { getCookie } from './cookies'

const BASE_NORMA_API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
}

async function request (endpoint, options) {
  const res = await fetch(`${BASE_NORMA_API_URL}/${endpoint}`, options);
  return checkResponse(res);
}

export function getIngredientsRequest () {
  return request('ingredients')
}

export function createOrderRequest (ingredients) {
  return request('orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')
    },
    body: JSON.stringify({ ingredients })
  })
}

export function loginRequest (email, password) {
  return request('auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
}

export function getUserRequest () {
  return request('auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')
    }
  })
}

export function updateUserRequest (newValues) {
  return request('auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')
    },
    body: JSON.stringify({ ...newValues })
  })
}

export function refreshTokenRequest () {
  return request('auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
}

export function logoutRequest () {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') ?? '' })
  })
}

export function registerRequest (form) {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
}

export function forgotPasswordRequest (email) {
  return request('auth/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
}

export function resetPasswordRequest (form) {
  return request('auth/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
}