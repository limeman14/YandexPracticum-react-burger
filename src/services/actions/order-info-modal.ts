import { OrderInfo } from '../../utils/types/common'
import { AppDispatch } from '../../utils/types/hooks'
import { getOrderByIdRequest } from '../../utils/api'
import { first } from 'lodash'

export const SET_ORDER_INFO_FOR_MODAL = 'SET_ORDER_INFO_FOR_MODAL'
export const REMOVE_ORDER_INFO_FROM_MODAL = 'REMOVE_ORDER_INFO_FROM_MODAL'

export const GET_ORDER_BY_ID_REQUEST = 'GET_ORDER_BY_ID_REQUEST'
export const GET_ORDER_BY_ID_SUCCESS = 'GET_ORDER_BY_ID_SUCCESS'
export const GET_ORDER_BY_ID_ERROR = 'GET_ORDER_BY_ID_ERROR'

export function setOrderInfoForModal (order: OrderInfo) {
  return { type: SET_ORDER_INFO_FOR_MODAL, current: order }
}

export function removeOrderInfoFromModal () {
  return { type: REMOVE_ORDER_INFO_FROM_MODAL }
}

export function getOrderById (id: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_BY_ID_REQUEST
    })
    getOrderByIdRequest(id).then(res => {
      dispatch({
        type: GET_ORDER_BY_ID_SUCCESS,
        current: first(res.orders) ?? null
      })
    }).catch(res => {
      dispatch({
        type: GET_ORDER_BY_ID_ERROR
      })
      console.error(res)
    })
  }
}