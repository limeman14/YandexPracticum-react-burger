import { OrderInfo } from '../../utils/types/common'
import { OrderFeedAction } from '../../utils/types/actions/web-socket'
import { WS_FEED_CLOSE, WS_FEED_ERROR, WS_FEED_GET_ORDERS, WS_FEED_INIT, WS_FEED_OPEN } from '../actions/web-socket'

type OrderFeedState = {
  isConnected: boolean
  isLoading: boolean

  orders: ReadonlyArray<OrderInfo>
  total: number
  totalToday: number

  error?: Event
}

const initialOrderFeedState: OrderFeedState = {
  isConnected: false,
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0
}

export const orderFeedStateReducer = (state = initialOrderFeedState, action: OrderFeedAction): OrderFeedState => {
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
      return {
        ...state,
        total,
        totalToday,
        orders
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