import { combineReducers } from 'redux'
import { burgerConstructorReducer, burgerIngredientsReducer, ingredientModalReducer, orderReducer } from './burger'
import { userReducer } from './user'
import { orderFeedReducer, profileOrdersReducer } from './web-socket'
import { orderInfoModalReducer } from './order-info-modal'

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  ingredientModal: ingredientModalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: userReducer,
  orderFeed: orderFeedReducer,
  profileOrders: profileOrdersReducer,
  orderModal: orderInfoModalReducer
})