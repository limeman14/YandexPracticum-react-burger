import { OrderFeedAction } from '../../utils/types/actions/web-socket'

export const WS_FEED_INIT = 'WS_FEED_INIT'
export const WS_FEED_OPEN = 'WS_FEED_OPEN'
export const WS_FEED_GET_ORDERS = 'WS_FEED_GET_ORDERS'
export const WS_FEED_ERROR = 'WS_FEED_ERROR'
export const WS_FEED_CLOSE = 'WS_FEED_CLOSE'

export const wsFeedInit = (): OrderFeedAction => ({ type: WS_FEED_INIT })
export const wsFeedClose = (): OrderFeedAction => ({ type: WS_FEED_CLOSE })

export const WS_USER_INIT = 'WS_USER_INIT'
export const WS_USER_OPEN = 'WS_USER_OPEN'
export const WS_USER_GET_ORDERS = 'WS_USER_GET_ORDERS'
export const WS_USER_ERROR = 'WS_USER_ERROR'
export const WS_USER_CLOSE = 'WS_USER_CLOSE'