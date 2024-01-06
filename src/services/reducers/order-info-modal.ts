import { OrderInfo } from '../../utils/types/common'
import { OrderInfoModalAction } from '../../utils/types/actions/order-info-modal'
import { REMOVE_ORDER_INFO_FROM_MODAL, SET_ORDER_INFO_FOR_MODAL } from '../actions/order-info-modal'

type OrderInfoModalState = {
  current: OrderInfo | null
}
const initialOrderInfoModalState: OrderInfoModalState = {
  current: null
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
    default:
      return state
  }
}