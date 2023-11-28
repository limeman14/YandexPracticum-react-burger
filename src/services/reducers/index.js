import { combineReducers } from 'redux'
import { burgerConstructorReducer, burgerIngredientsReducer, ingredientModalReducer, orderReducer } from './burger'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientModal: ingredientModalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer
})