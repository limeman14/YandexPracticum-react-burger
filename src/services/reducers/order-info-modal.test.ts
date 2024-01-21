import { initialOrderInfoModalState, orderInfoModalReducer } from './order-info-modal'
import {
  GET_ORDER_BY_ID_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  REMOVE_ORDER_INFO_FROM_MODAL,
  SET_ORDER_INFO_FOR_MODAL
} from '../actions/order-info-modal'
import { OrderInfoModalAction } from '../../utils/types/actions/order-info-modal'
import { OrderInfo, OrderStatus } from '../../utils/types/common'

describe('OrderInfoModalReducer', () => {
  const orderInfo: OrderInfo = { 
    _id: '1234',
    number: 1234,
    name: 'Cheese Burger',
    status: OrderStatus.DONE,
    createdAt: 'date',
    updatedAt: 'date',
    ingredients: ['1', '2']
  }

  it('should handle SET_ORDER_INFO_FOR_MODAL', () => {
    const action: OrderInfoModalAction = { type: SET_ORDER_INFO_FOR_MODAL, current: orderInfo }
    const initialState = {...initialOrderInfoModalState}

    expect(orderInfoModalReducer(initialState, action)).toEqual({
      ...initialState,
      current: orderInfo
    })
  })

  it('should handle REMOVE_ORDER_INFO_FROM_MODAL', () => {
    const action: OrderInfoModalAction = { type: REMOVE_ORDER_INFO_FROM_MODAL }
    const initialState = {...initialOrderInfoModalState, current: orderInfo}

    expect(orderInfoModalReducer(initialState, action)).toEqual({
      ...initialState,
      current: null
    })
  })

  it('should handle GET_ORDER_BY_ID_REQUEST', () => {
    const action: OrderInfoModalAction = { type: GET_ORDER_BY_ID_REQUEST }
    const initialState = {...initialOrderInfoModalState}

    expect(orderInfoModalReducer(initialState, action)).toEqual({
      ...initialState,
      orderInfoRequest: true,
      orderInfoError: false
    })
  })

  it('should handle GET_ORDER_BY_ID_SUCCESS', () => {
    const action: OrderInfoModalAction = { type: GET_ORDER_BY_ID_SUCCESS, current: orderInfo }
    const initialState = {...initialOrderInfoModalState}

    expect(orderInfoModalReducer(initialState, action)).toEqual({
      ...initialState,
      orderInfoRequest: false,
      orderInfoError: false,
      current: action.current
    })
  })

  it('should handle GET_ORDER_BY_ID_ERROR', () => {
    const action: OrderInfoModalAction = { type: GET_ORDER_BY_ID_ERROR }
    const initialState = {...initialOrderInfoModalState}

    expect(orderInfoModalReducer(initialState, action)).toEqual({
      ...initialState,
      orderInfoRequest: false,
      orderInfoError: true
    })
  })
})