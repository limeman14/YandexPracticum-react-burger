import { OrderInfo } from '../../utils/types/common'
import { OrderInfoModalAction } from '../../utils/types/actions/order-info-modal'
import {
  GET_ORDER_BY_ID_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  REMOVE_ORDER_INFO_FROM_MODAL,
  SET_ORDER_INFO_FOR_MODAL
} from '../actions/order-info-modal'

type OrderInfoModalState = {
  current: OrderInfo | null,
  orderInfoRequest: boolean,
  orderInfoError: boolean
}
const initialOrderInfoModalState: OrderInfoModalState = {
  current: null,
  orderInfoRequest: false,
  orderInfoError: false
}

export const orderInfoModalReducer = (state = initialOrderInfoModalState, action: OrderInfoModalAction) => {
  switch (action.type) {
    case SET_ORDER_INFO_FOR_MODAL:
      return {
        ...state,
        current: action.current
      }
    case REMOVE_ORDER_INFO_FROM_MODAL: {
      return {
        ...state,
        current: null
      }
    }
    case GET_ORDER_BY_ID_REQUEST: {
      return {
        ...state,
        orderInfoRequest: true,
        orderInfoError: false
      }
    }
    case GET_ORDER_BY_ID_SUCCESS: {
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoError: false,
        current: action.current
      }
    }
    case GET_ORDER_BY_ID_ERROR: {
      return {
        ...state,
        orderInfoRequest: false,
        orderInfoError: true
      }
    }
    default:
      return state
  }
}