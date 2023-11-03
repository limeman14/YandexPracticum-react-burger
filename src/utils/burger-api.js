const BASE_NORMA_API_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export function getIngredients () {
  return fetch(`${BASE_NORMA_API_URL}/ingredients`)
    .then(checkResponse)
}

export function createOrder (ingredients) {
  return fetch(`${BASE_NORMA_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ingredients })
  }).then(checkResponse)
}