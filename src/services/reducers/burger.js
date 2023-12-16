import {
  ADD_INGREDIENT,
  CLEAR_CONSTRUCTOR_LIST,
  CLEAR_INGREDIENT_COUNTERS,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DECREMENT_INGREDIENT_COUNTER,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  INCREMENT_INGREDIENT_COUNTER,
  REMOVE_INGREDIENT,
  REMOVE_INGREDIENT_FROM_MODAL,
  SET_INGREDIENT_FOR_MODAL,
  UPDATE_CONSTRUCTOR_LIST
} from '../actions/burger'
import { IngredientType } from '../../utils/types/common-types'

const burgerIngredientsInitialState = {
  ingredients: [],
  ingredientCounters: {},
  ingredientsRequest: true,
  ingredientsError: false
}

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
  function removeAllBunCounters (newIngredientCounters) {
    state.ingredients.filter(i => i.type === IngredientType.BUN)
      .forEach(i => delete newIngredientCounters[i._id])
  }

  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsError: false,
        ingredientsRequest: false,
        ingredients: action.ingredients
      }
    }
    case FETCH_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredientsError: true,
        ingredientsRequest: false,
      }
    case INCREMENT_INGREDIENT_COUNTER: {
      const ingredient = action.ingredient
      const isBun = ingredient.type === 'bun'
      const incrementValue = isBun ? 2 : 1
      const newIngredientCounters = { ...state.ingredientCounters }
      if (isBun) {
        removeAllBunCounters(newIngredientCounters)
      }
      newIngredientCounters[ingredient._id] = (newIngredientCounters[ingredient._id] ?? 0) + incrementValue

      return {
        ...state,
        ingredientCounters: newIngredientCounters
      }
    }
    case DECREMENT_INGREDIENT_COUNTER: {
      const newIngredientCounters = { ...state.ingredientCounters }
      const id = action.id
      const newCounterValue = newIngredientCounters[id] - 1
      newIngredientCounters[id] = newCounterValue === 0 ? undefined : newCounterValue

      return {
        ...state,
        ingredientCounters: newIngredientCounters
      }
    }
    case CLEAR_INGREDIENT_COUNTERS: {
      return {
        ...state,
        ingredientCounters: {}
      }
    }
    default:
      return state
  }
}

const ingredientModalInitialState = {
  current: null
}

export const ingredientModalReducer = (state = ingredientModalInitialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_FOR_MODAL:
      return {
        ...state,
        current: action.ingredient
      }
    case REMOVE_INGREDIENT_FROM_MODAL:
      return {
        ...state,
        current: null
      }
    default:
      return state
  }
}

const burgerConstructorInitialState = {
  bun: null,
  mainIngredients: []
}

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const newState = { ...state }
      const ingredient = action.ingredient
      if (ingredient.type === 'bun') {
        newState.bun = ingredient
      } else {
        newState.mainIngredients = [...newState.mainIngredients, ingredient]
      }
      return newState
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        mainIngredients: state.mainIngredients.filter(i => i.dragId !== action.id)
      }
    }
    case UPDATE_CONSTRUCTOR_LIST: {
      return {
        ...state,
        mainIngredients: action.newMainIngredients
      }
    }
    case CLEAR_CONSTRUCTOR_LIST: {
      return {
        ...state,
        bun: null,
        mainIngredients: []
      }
    }
    default:
      return state
  }
}

const orderInitialState = {
  createdOrder: null,
  createOrderRequest: false,
  createOrderError: false
}

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        createOrderRequest: true,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        createOrderError: false,
        createOrderRequest: false,
        createdOrder: action.createdOrder
      }
    }
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        createOrderError: true,
        createOrderRequest: false,
        createdOrder: null
      }
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        createdOrder: null
      }
    default:
      return state
  }
}