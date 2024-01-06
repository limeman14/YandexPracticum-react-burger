import { REMOVE_ORDER_INFO_FROM_MODAL, SET_ORDER_INFO_FOR_MODAL } from '../../../services/actions/order-info-modal'
import { OrderInfo } from '../common'

type SetOrderInfoForModalAction = {
  readonly type: typeof SET_ORDER_INFO_FOR_MODAL
  readonly current: OrderInfo
}
type RemoveOrderInfoFromModalAction = {
  readonly type: typeof REMOVE_ORDER_INFO_FROM_MODAL
}
export type OrderInfoModalAction = SetOrderInfoForModalAction | RemoveOrderInfoFromModalAction