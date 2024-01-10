import { useSelector } from '../../../utils/types/hooks'
import { OrderTotal } from './order-total/OrderTotal'
import { useMemo } from 'react'
import { groupBy } from 'lodash'
import { OrderInfo, OrderStatus } from '../../../utils/types/common'
import styles from './OrderStats.module.css'
import { getOrderFeed } from '../../../services/store/selectors'

const createColumns = (ordersArray: OrderInfo[]) => {
  const columns: OrderInfo[][] = []
  let currentColumn: OrderInfo[] = []

  ordersArray.forEach((order, index) => {
    currentColumn.push(order)

    if ((index + 1) % 10 === 0 || index === ordersArray.length - 1) {
      columns.push(currentColumn)
      currentColumn = []
    }
  })

  return columns
}

export function OrderStats () {
  const { total, totalToday, orders } = useSelector(getOrderFeed)
  const { pendingColumns, doneColumns} = useMemo(() => {
    const ordersByStatus = groupBy(orders, (order) => order.status)
    const pendingColumns = createColumns(ordersByStatus[OrderStatus.PENDING] ?? [])
    const doneColumns = createColumns(ordersByStatus[OrderStatus.DONE] ?? [])

    return { pendingColumns, doneColumns }
  }, [orders])

  return (
    <div className='mt-25'>
      <div className={styles.orderStats__table_div}>
        <div className='mr-9'>
          <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
          <div className={styles.orderStats__table_columns}>
            {doneColumns.map((column, index) => (
              <div key={index} className={styles.orderStats__table_oneColumn}>
                {column.map(order => <span className='text_type_digits-default text_color_success' key={order._id}>{order.number}</span>)}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
          <div className={styles.orderStats__table_columns}>
            {pendingColumns.map((column, index) => (
              <div key={index} className={styles.orderStats__table_oneColumn}>
                {column.map(order => <span className='text_type_digits-default' key={order._id}>{order.number}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <OrderTotal value={total} title='Выполнено за все время:'/>
      <OrderTotal value={totalToday} title='Выполнено за сегодня:'/>
    </div>
  )
}