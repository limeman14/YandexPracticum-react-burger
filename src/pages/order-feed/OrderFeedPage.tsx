import styles from './OrderFeedPage.module.css'
import { OrderFeed } from '../../components/order-feed/OrderFeed'
import { OrderStats } from '../../components/order-feed/order-stats/OrderStats'
import { useDispatch, useSelector } from '../../utils/types/hooks'
import { useEffect } from 'react'
import { wsFeedClose, wsFeedInit } from '../../services/actions/web-socket'
import { getOrderFeed } from '../../services/store/selectors'

export function OrderFeedPage () {
  const { isLoading, error } = useSelector(getOrderFeed)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wsFeedInit())

    return () => {
      dispatch(wsFeedClose())
    }
  }, [dispatch])

  return !isLoading && !error ? (
    <main className={styles.main__main}>
      <section className={styles.main__leftSection}>
        <OrderFeed />
      </section>
      <section className={styles.main__rightSection}>
        <OrderStats />
      </section>
    </main>
  ) : null
}