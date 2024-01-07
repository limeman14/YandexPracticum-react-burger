import { OrderFeedAction, ProfileOrdersAction } from '../../utils/types/actions/web-socket'

export const WS_FEED_INIT = 'WS_FEED_INIT'
export const WS_FEED_OPEN = 'WS_FEED_OPEN'
export const WS_FEED_GET_ORDERS = 'WS_FEED_GET_ORDERS'
export const WS_FEED_ERROR = 'WS_FEED_ERROR'
export const WS_FEED_CLOSE = 'WS_FEED_CLOSE'

export const wsFeedInit = (): OrderFeedAction => ({ type: WS_FEED_INIT })
export const wsFeedClose = (): OrderFeedAction => ({ type: WS_FEED_CLOSE })

export const WS_PROFILE_ORDERS_INIT = 'WS_PROFILE_ORDERS_INIT'
export const WS_PROFILE_ORDERS_OPEN = 'WS_PROFILE_ORDERS_OPEN'
export const WS_PROFILE_GET_ORDERS = 'WS_PROFILE_GET_ORDERS'
export const WS_PROFILE_ORDERS_ERROR = 'WS_PROFILE_ORDERS_ERROR'
export const WS_PROFILE_ORDERS_CLOSE = 'WS_PROFILE_ORDERS_CLOSE'

export const wsProfileOrdersInit = (): ProfileOrdersAction => ({ type: WS_PROFILE_ORDERS_INIT })
export const wsProfileOrdersClose = (): ProfileOrdersAction => ({ type: WS_PROFILE_ORDERS_CLOSE })