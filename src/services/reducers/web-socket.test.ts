import { initialOrderFeedState, orderFeedReducer, profileOrdersInitialState, profileOrdersReducer } from './web-socket'
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
import { OrderFeedAction, ProfileOrdersAction } from '../../utils/types/actions/web-socket'
import { OrderInfo, OrderStatus } from '../../utils/types/common'

const correctOrder: OrderInfo = {
  _id: '1234',
  number: 1234,
  name: 'Cheese Burger',
  status: OrderStatus.DONE,
  createdAt: '2022-01-01T00:00:00Z',
  updatedAt: 'date',
  ingredients: ['1', '2']
}
const incorrectOrder = {
  ...correctOrder,
  ingredients: [null, '2']
}

describe('OrderFeedReducer Tests', () => {
  it('should handle WS_FEED_INIT', () => {
    const action: OrderFeedAction = { type: WS_FEED_INIT }

    expect(orderFeedReducer(initialOrderFeedState, action)).toEqual({
      ...initialOrderFeedState,
      isConnected: true,
      isLoading: true
    })
  })

  it('should handle WS_FEED_OPEN', () => {
    const action: OrderFeedAction = { type: WS_FEED_OPEN }

    expect(orderFeedReducer(initialOrderFeedState, action)).toEqual({
      ...initialOrderFeedState,
      isConnected: true,
      isLoading: false
    })
  })

  it('should handle WS_FEED_GET_ORDERS', () => {
    const payload = {
      total: 1,
      totalToday: 1,
      orders: [correctOrder, incorrectOrder]
    }
    // @ts-ignore
    const action: OrderFeedAction = { type: WS_FEED_GET_ORDERS, payload }

    expect(orderFeedReducer(initialOrderFeedState, action)).toEqual({
      ...initialOrderFeedState,
      total: payload.total,
      totalToday: payload.totalToday,
      orders: [correctOrder]
    })
  })

  it('should handle WS_FEED_ERROR', () => {
    const payload = new Event('error')
    const action: OrderFeedAction = { type: WS_FEED_ERROR, payload }

    expect(orderFeedReducer(initialOrderFeedState, action)).toEqual({
      ...initialOrderFeedState,
      isConnected: false,
      isLoading: false,
      error: payload
    })
  })

  it('should handle WS_FEED_CLOSE', () => {
    const action: OrderFeedAction = { type: WS_FEED_CLOSE }

    expect(orderFeedReducer(initialOrderFeedState, action)).toEqual({
      ...initialOrderFeedState,
      isConnected: false,
      isLoading: false
    })
  })
})

describe('ProfileOrdersReducer Tests', () => {
  it('should handle WS_PROFILE_ORDERS_INIT', () => {
    const action: ProfileOrdersAction = { type: WS_PROFILE_ORDERS_INIT }

    expect(profileOrdersReducer(profileOrdersInitialState, action)).toEqual({
      ...profileOrdersInitialState,
      isConnected: true,
      isLoading: true
    })
  })

  it('should handle WS_PROFILE_ORDERS_OPEN', () => {
    const action: ProfileOrdersAction = { type: WS_PROFILE_ORDERS_OPEN }

    expect(profileOrdersReducer(profileOrdersInitialState, action)).toEqual({
      ...profileOrdersInitialState,
      isConnected: true,
      isLoading: false
    })
  })

  it('should handle WS_PROFILE_GET_ORDERS', () => {
    const secondCorrectOrder: OrderInfo = {
      ...correctOrder,
      createdAt: '2022-01-02T00:00:00Z'
    }
    const payload = {
      total: 2,
      totalToday: 2,
      orders: [secondCorrectOrder, correctOrder, incorrectOrder]
    }
    // @ts-ignore
    const action: ProfileOrdersAction = { type: WS_PROFILE_GET_ORDERS, payload }

    expect(profileOrdersReducer(profileOrdersInitialState, action)).toEqual({
      ...profileOrdersInitialState,
      total: payload.total,
      totalToday: payload.totalToday,
      orders: [secondCorrectOrder, correctOrder]
    })
  })

  it('should handle WS_PROFILE_ORDERS_ERROR', () => {
    const payload = new Event('error')
    const action: ProfileOrdersAction = { type: WS_PROFILE_ORDERS_ERROR, payload }

    expect(profileOrdersReducer(profileOrdersInitialState, action)).toEqual({
      ...profileOrdersInitialState,
      isConnected: false,
      isLoading: false,
      error: payload
    })
  })

  it('should handle WS_PROFILE_ORDERS_CLOSE', () => {
    const action: ProfileOrdersAction = { type: WS_PROFILE_ORDERS_CLOSE }

    expect(profileOrdersReducer(profileOrdersInitialState, action)).toEqual({
      ...profileOrdersInitialState,
      isConnected: false,
      isLoading: false
    })
  })
})
