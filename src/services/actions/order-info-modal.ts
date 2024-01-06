import { OrderInfo } from '../../utils/types/common'

export const SET_ORDER_INFO_FOR_MODAL = 'SET_ORDER_INFO_FOR_MODAL'
export const REMOVE_ORDER_INFO_FROM_MODAL = 'REMOVE_ORDER_INFO_FROM_MODAL'

export function setOrderInfoForModal (order: OrderInfo) {
  return { type: SET_ORDER_INFO_FOR_MODAL, current: order }
}

export function removeOrderInfoFromModal () {
  return { type: REMOVE_ORDER_INFO_FROM_MODAL }
}