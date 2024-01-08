import { RootState } from '../../utils/types/hooks'

export const getOrderFeed = (store: RootState) => store.orderFeed
export const getOrderFeedOrders = (store: RootState) => store.orderFeed.orders
export const getProfileOrders = (store: RootState) => store.profileOrders
export const getProfileOrdersOrders = (store: RootState) => store.profileOrders.orders
export const getOrderModal = (store: RootState) => store.orderModal

export const getUserStore = (store: RootState) => store.user

export const getBurgerIngredients = (store: RootState) => store.burgerIngredients

export const getBurgerConstructor = (store: RootState) => store.burgerConstructor

export const getIngredientModal = (store: RootState) => store.ingredientModal

export const getOrder = (store: RootState) => store.order