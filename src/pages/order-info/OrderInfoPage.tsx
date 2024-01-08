import styles from './OrderInfoPage.module.css'
import { OrderFullInfo } from '../../components/order-full-info/OrderFullInfo'
import { getOrderFeedOrders, getProfileOrdersOrders } from '../../services/store/selectors'
import { useLocation, useParams } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'

export function OrderInfoPage () {
  const location = useLocation()
  const ordersSelector = location.pathname.includes(ROUTES.ORDERS_FEED)
    ? getOrderFeedOrders
    : getProfileOrdersOrders

  const { id } = useParams()

  return (
    <div className={styles.orderInfoPage__container}>
      <h2 className="text text_type_digits-default text_center">#{id}</h2>
      <OrderFullInfo ordersSelector={ordersSelector}/>
    </div>
  )
}