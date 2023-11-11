import {
  ADD_INGREDIENT,
  CLOSE_INGREDIENT_MODAL,
  CLOSE_ORDER_MODAL,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS, DECREMENT_INGREDIENT_COUNTER,
  DELETE_INGREDIENT,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS, INCREMENT_INGREDIENT_COUNTER, UPDATE_CONSTRUCTOR_LIST,
  OPEN_INGREDIENT_MODAL
} from '../actions/burger'

const burgerIngredientsInitialState = {
  ingredients: [],
  ingredientCounters: {
    '643d69a5c3f7b9001cfa093c': 2
  },
  ingredientsRequest: true,
  ingredientsError: false
}

export const burgerIngredientsReducer = (state = burgerIngredientsInitialState, action) => {
  function removeAllBunCounters (newIngredientCounters) {
    state.ingredients.filter(i => i.type === 'bun')
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
      const id = action._id
      const newCounterValue = newIngredientCounters[id] - 1
      newIngredientCounters[id] = newCounterValue === 0 ? undefined : newCounterValue

      return {
        ...state,
        ingredientCounters: newIngredientCounters
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
    case OPEN_INGREDIENT_MODAL:
      return {
        ...state,
        current: action.ingredient
      }
    case CLOSE_INGREDIENT_MODAL:
      return {
        ...state,
        current: null
      }
    default:
      return state
  }
}

const burgerConstructorInitialState = {
  bun: {
    '_id': '643d69a5c3f7b9001cfa093c',
    'name': 'Краторная булка N-200i',
    'type': 'bun',
    'proteins': 80,
    'fat': 24,
    'carbohydrates': 53,
    'calories': 420,
    'price': 1255,
    'image': 'https://code.s3.yandex.net/react/code/bun-02.png',
    'image_mobile': 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    'image_large': 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    '__v': 0
  },
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
    case DELETE_INGREDIENT: {
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