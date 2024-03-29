import styles from './ProfileOrdersPage.module.css'
import { useDispatch, useSelector } from '../../utils/types/hooks'
import { useEffect } from 'react'
import { wsProfileOrdersClose, wsProfileOrdersInit } from '../../services/actions/web-socket'
import { ProfileNavigation } from '../../components/profile/profile-navigation/ProfileNavigation'
import { OrderCard } from '../../components/order-feed/order-card/OrderCard'
import { ROUTES } from '../../utils/app-routes'
import { getProfileOrders, getProfileOrdersOrders } from '../../services/store/selectors'

export function ProfileOrdersPage () {
  const { isLoading, error } = useSelector(getProfileOrders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(wsProfileOrdersInit())

    return () => {
      dispatch(wsProfileOrdersClose())
    }
  }, [dispatch])

  const orders = useSelector(getProfileOrdersOrders)

  return (
    <div className={styles.profileOrders__container}>
      <ProfileNavigation/>
      {!isLoading && !error
        ? <ul className={styles.profileOrders__ul}>
          {orders.map(el => {
            return (<OrderCard key={el._id} order={el} withStatus orderModalPath={`${ROUTES.PROFILE_ORDERS}/${el.number}`}/>)
          })}
        </ul>
        : null
      }
    </div>
  )
}