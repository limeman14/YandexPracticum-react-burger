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
      'Content-Type': 'application/json'
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

export function registerRequest (form) {
  return request('auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...form })
  })
}