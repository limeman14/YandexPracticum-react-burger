import styles from './OrderFeed.module.css'
import { useSelector } from '../../utils/types/hooks'
import { OrderCard } from './order-card/OrderCard'
import { ROUTES } from '../../utils/app-routes'
import { getOrderFeedOrders } from '../../services/store/selectors'

export function OrderFeed () {
  const orders = useSelector(getOrderFeedOrders)

  return (
    <>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
      <ul className={styles.orderFeed__ul}>
        {orders.map(el => {
          return (<OrderCard key={el._id} order={el} orderModalPath={`${ROUTES.ORDERS_FEED}/${el.number}`}/>)
        })}
      </ul>
    </>
  )
}