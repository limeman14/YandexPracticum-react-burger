import {
  GET_ORDER_BY_ID_ERROR,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  REMOVE_ORDER_INFO_FROM_MODAL,
  SET_ORDER_INFO_FOR_MODAL
} from '../../../services/actions/order-info-modal'
import { OrderInfo } from '../common'

type SetOrderInfoForModalAction = {
  readonly type: typeof SET_ORDER_INFO_FOR_MODAL
  readonly current: OrderInfo
}
type RemoveOrderInfoFromModalAction = {
  readonly type: typeof REMOVE_ORDER_INFO_FROM_MODAL
}
type GetOrderByIdRequestAction = {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST
}
type GetOrderByIdSuccessAction = {
  readonly type: typeof GET_ORDER_BY_ID_SUCCESS
  readonly current: OrderInfo | null
}
type GetOrderByIdErrorAction = {
  readonly type: typeof GET_ORDER_BY_ID_ERROR
}
export type OrderInfoModalAction =
  SetOrderInfoForModalAction |
  RemoveOrderInfoFromModalAction |
  GetOrderByIdRequestAction |
  GetOrderByIdSuccessAction |
  GetOrderByIdErrorAction