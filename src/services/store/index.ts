import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux'
import { createWebSocketMiddleware, WebSocketActions } from '../middleware/generic-socket'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers'
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
import { WEB_SOCKET_BASE_API_URL } from '../../utils/api'

const orderFeedWsActions: WebSocketActions = {
  init: WS_FEED_INIT,
  open: WS_FEED_OPEN,
  message: WS_FEED_GET_ORDERS,
  error: WS_FEED_ERROR,
  close: WS_FEED_CLOSE
}

const profileOrdersWsActions: WebSocketActions = {
  init: WS_PROFILE_ORDERS_INIT,
  open: WS_PROFILE_ORDERS_OPEN,
  message: WS_PROFILE_GET_ORDERS,
  error: WS_PROFILE_ORDERS_ERROR,
  close: WS_PROFILE_ORDERS_CLOSE
}

const orderFeedWs = createWebSocketMiddleware(orderFeedWsActions, `${WEB_SOCKET_BASE_API_URL}/all`)
const profileOrdersWs = createWebSocketMiddleware(profileOrdersWsActions, WEB_SOCKET_BASE_API_URL, true)

const composeEnhancers =
  // @ts-ignore
  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    // @ts-ignore
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk, orderFeedWs, profileOrdersWs))

export const store = createStore(rootReducer, enhancer)