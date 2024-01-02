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
} from '../../../services/actions/burger'
import { Ingredient, WithDragId } from '../common'

type FetchIngredientsRequestAction = {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST
}
type FetchIngredientsSuccessAction = {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS
  ingredients: ReadonlyArray<Ingredient>
}
type FetchIngredientsErrorAction = {
  readonly type: typeof FETCH_INGREDIENTS_ERROR
}
type IncrementIngredientCounterAction = {
  readonly type: typeof INCREMENT_INGREDIENT_COUNTER
  readonly ingredient: WithDragId<Ingredient>
}
type DecrementIngredientCounterAction = {
  readonly type: typeof DECREMENT_INGREDIENT_COUNTER
  readonly id: string
}
type ClearIngredientCountersAction = {
  readonly type: typeof CLEAR_INGREDIENT_COUNTERS
}
export type BurgerIngredientsAction =
  FetchIngredientsRequestAction |
  FetchIngredientsSuccessAction |
  FetchIngredientsErrorAction |
  IncrementIngredientCounterAction |
  DecrementIngredientCounterAction |
  ClearIngredientCountersAction

type SetIngredientForModalAction = {
  readonly type: typeof SET_INGREDIENT_FOR_MODAL
  readonly ingredient: Ingredient
}
type RemoveIngredientFromModalAction = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_MODAL
}
export type IngredientModalAction = SetIngredientForModalAction | RemoveIngredientFromModalAction

type AddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT
  readonly ingredient: WithDragId<Ingredient>
}
type RemoveIngredientAction = {
  readonly type: typeof REMOVE_INGREDIENT
  readonly id: number
}
type UpdateConstructorListAction = {
  readonly type: typeof UPDATE_CONSTRUCTOR_LIST
  newMainIngredients: ReadonlyArray<WithDragId<Ingredient>>
}
type ClearConstructorListAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR_LIST
}
export type BurgerConstructorAction =
  AddIngredientAction |
  RemoveIngredientAction |
  UpdateConstructorListAction |
  ClearConstructorListAction

type CreateOrderRequestAction = {
  readonly type: typeof CREATE_ORDER_REQUEST
}
type CreateOrderSuccessAction = {
  readonly type: typeof CREATE_ORDER_SUCCESS
  readonly createdOrder: number
}
type CreateOrderErrorAction = {
  readonly type: typeof CREATE_ORDER_ERROR
}
type CloseOrderModalAction = {
  readonly type: typeof CLOSE_ORDER_MODAL
}
export type OrderAction =
  CreateOrderRequestAction |
  CreateOrderSuccessAction |
  CreateOrderErrorAction |
  CloseOrderModalAction