import { OrderInfo } from '../../utils/types/common'
import { OrderFeedAction, ProfileOrdersAction } from '../../utils/types/actions/web-socket'
import {
  WS_FEED_CLOSE,
  WS_FEED_ERROR,
  WS_FEED_GET_ORDERS,
  WS_FEED_INIT,
  WS_FEED_OPEN,
  WS_PROFILE_GET_ORDERS,
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_INIT,
  WS_PROFILE_ORDERS_OPEN
} from '../actions/web-socket'
import { orderBy } from 'lodash'

type OrderStatsWsState = {
  isConnected: boolean
  isLoading: boolean

  orders: ReadonlyArray<OrderInfo>
  total: number
  totalToday: number

  error?: Event
}

export const initialOrderFeedState: OrderStatsWsState = {
  isConnected: false,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const orderFeedReducer = (state = initialOrderFeedState, action: OrderFeedAction): OrderStatsWsState => {
  switch (action.type) {
    case WS_FEED_INIT:
      return {
        ...state,
        isConnected: true,
        isLoading: true
      }
    case WS_FEED_OPEN:
      return {
        ...state,
        isConnected: true,
        isLoading: false
      }
    case WS_FEED_GET_ORDERS:
      const { total, totalToday, orders } = action.payload
      const filteredOrders = orders
        .filter(order => order.ingredients.every(id => id != null))
      return {
        ...state,
        total,
        totalToday,
        orders: filteredOrders
      }
    case WS_FEED_ERROR:
      return {
        ...state,
        isConnected: false,
        isLoading: false,
        error: action.payload
      }
    case WS_FEED_CLOSE:
      return {
        ...state,
        isConnected: false,
        isLoading: false
      }
    default:
      return state
  }
}

export const profileOrdersInitialState: OrderStatsWsState = {
  isConnected: false,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const profileOrdersReducer = (state = profileOrdersInitialState, action: ProfileOrdersAction) => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_INIT:
      return {
        ...state,
        isConnected: true,
        isLoading: true
      }
    case WS_PROFILE_ORDERS_OPEN:
      return {
        ...state,
        isConnected: true,
        isLoading: false
      }
    case WS_PROFILE_GET_ORDERS:
      const { total, totalToday, orders } = action.payload
      const filteredOrders = orders.filter(order => order.ingredients.every(id => id != null))
      const sortedOrders = orderBy(filteredOrders, i => new Date(i.createdAt), 'desc')
      return {
        ...state,
        total,
        totalToday,
        orders: sortedOrders
      }
    case WS_PROFILE_ORDERS_ERROR:
      return {
        ...state,
        isConnected: false,
        isLoading: false,
        error: action.payload
      }
    case WS_PROFILE_ORDERS_CLOSE:
      return {
        ...state,
        isConnected: false,
        isLoading: false
      }
    default:
      return state
  }
}