import { createOrderRequest, getIngredientsRequest } from '../../utils/burger-api'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST'
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS'
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR'
export const INCREMENT_INGREDIENT_COUNTER = 'INCREMENT_INGREDIENT_COUNTER'
export const DECREMENT_INGREDIENT_COUNTER = 'DECREMENT_INGREDIENT_COUNTER'
export const CLEAR_INGREDIENT_COUNTERS = 'CLEAR_INGREDIENT_COUNTERS'

export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL'
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL'

export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const UPDATE_CONSTRUCTOR_LIST = 'MOVE_MAIN_INGREDIENT'
export const CLEAR_CONSTRUCTOR_LIST = 'CLEAR_CONSTRUCTOR_LIST'

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR'
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'

export function fetchIngredients() {
  return function (dispatch) {
    dispatch({
      type: FETCH_INGREDIENTS_REQUEST
    })
    getIngredientsRequest().then(res => {
      dispatch({
        type: FETCH_INGREDIENTS_SUCCESS,
        ingredients: res.data
      })
    }).catch(res => {
      dispatch({
        type: FETCH_INGREDIENTS_ERROR
      })
      console.error(res)
    })
  }
}
export function incrementCounter(ingredient) {
  return {
    type: INCREMENT_INGREDIENT_COUNTER,
    ingredient
  }
}
export function decrementCounter(id) {
  return {
    type: DECREMENT_INGREDIENT_COUNTER,
    id
  }
}

export function openIngredientModal(ingredient) {
  return {
    type: OPEN_INGREDIENT_MODAL,
    ingredient
  }
}
export function closeIngredientModal() {
  return {
    type: CLOSE_INGREDIENT_MODAL
  }
}

export function addToConstructor(ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient: {
      ...ingredient,
      dragId: Math.random()
    }
  }
}
export function removeFromConstructor(id) {
  return {
    type: REMOVE_INGREDIENT,
    id
  }
}
export function updateConstructorList(newMainIngredients) {
  return {
    type: UPDATE_CONSTRUCTOR_LIST,
    newMainIngredients
  }
}

export const createOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST
  })
  createOrderRequest(ingredients).then(res => {
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      createdOrder: res.order.number
    })
    dispatch({ type: CLEAR_CONSTRUCTOR_LIST })
    dispatch({ type: CLEAR_INGREDIENT_COUNTERS })
  }).catch(res => {
    dispatch({
      type: CREATE_ORDER_ERROR
    })
    console.error(res)
  })
}
export function closeOrderModal() {
  return {
    type: CLOSE_ORDER_MODAL
  }
}