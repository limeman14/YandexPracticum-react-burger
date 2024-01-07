import { useParams } from 'react-router-dom'
import { RootState, useDispatch, useSelector } from '../../utils/types/hooks'
import { useEffect } from 'react'
import { getOrderById, setOrderInfoForModal } from '../../services/actions/order-info-modal'
import styles from './OrderInfoPage.module.css'
import { OrderFullInfo } from '../../components/order-full-info/OrderFullInfo'
import { NotFoundPage } from '../not-found/NotFoundPage'
import { OrderInfo } from '../../utils/types/common'

interface OrderInfoPageProps {
  ordersSelector: (store: RootState) => ReadonlyArray<OrderInfo>
}

export function OrderInfoPage ({ ordersSelector }: OrderInfoPageProps) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const orders = useSelector(ordersSelector)
  const currentOrderFromFeed = orders.find(o => o.number.toString() === id)
  const { current: currentOrderInfo, orderInfoRequest, orderInfoError  } = useSelector(store => store.orderModal)

  useEffect(() => {
    if (currentOrderFromFeed) {
      dispatch(setOrderInfoForModal(currentOrderFromFeed))
    } else {
      if (id) {
        dispatch(getOrderById(id))
      }
    }
  }, [currentOrderFromFeed, dispatch, id])

  if (orderInfoRequest) {
    return null
  }

  return (
    !orderInfoError && currentOrderInfo
      ? <div className={styles.orderInfoPage__container}>
        <h2 className='text text_type_digits-default text_center'>#{id}</h2>
        <OrderFullInfo />
      </div>
      : <NotFoundPage />
  )
}