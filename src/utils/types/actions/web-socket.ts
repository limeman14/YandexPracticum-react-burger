import {
  WS_FEED_CLOSE,
  WS_FEED_ERROR,
  WS_FEED_GET_ORDERS,
  WS_FEED_INIT,
  WS_FEED_OPEN
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