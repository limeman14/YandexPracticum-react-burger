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
} from '../../../services/actions/web-socket'
import { OrderInfo } from '../common'

type OrderFeedWsInitAction = {
  readonly type: typeof WS_FEED_INIT
}
type OrderFeedWsOpenAction = {
  readonly type: typeof WS_FEED_OPEN
}
type OrderFeedWsGetOrdersAction = {
  readonly type: typeof WS_FEED_GET_ORDERS
  payload: {
    readonly total: number
    readonly totalToday: number
    orders: ReadonlyArray<OrderInfo>
  }
}
type OrderFeedWsErrorAction = {
  readonly type: typeof WS_FEED_ERROR
  readonly payload: Event
}
type OrderFeedWsCloseAction = {
  readonly type: typeof WS_FEED_CLOSE
}
export type OrderFeedAction =
  OrderFeedWsInitAction |
  OrderFeedWsOpenAction |
  OrderFeedWsGetOrdersAction |
  OrderFeedWsErrorAction |
  OrderFeedWsCloseAction

type ProfileOrdersWsInitAction = {
  readonly type: typeof WS_PROFILE_ORDERS_INIT
}
type ProfileOrdersWsOpenAction = {
  readonly type: typeof WS_PROFILE_ORDERS_OPEN
}
type ProfileOrdersWsGetOrdersAction = {
  readonly type: typeof WS_PROFILE_GET_ORDERS
  payload: {
    readonly total: number
    readonly totalToday: number
    orders: ReadonlyArray<OrderInfo>
  }
}
type ProfileOrdersWsErrorAction = {
  readonly type: typeof WS_PROFILE_ORDERS_ERROR
  readonly payload: Event
}
type ProfileOrdersWsCloseAction = {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSE
}
export type ProfileOrdersAction =
  ProfileOrdersWsInitAction |
  ProfileOrdersWsOpenAction |
  ProfileOrdersWsGetOrdersAction |
  ProfileOrdersWsErrorAction |
  ProfileOrdersWsCloseAction