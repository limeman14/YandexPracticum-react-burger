import styles from './ProfileNavigation.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from '../../../utils/types/hooks'
import { logout } from '../../../services/actions/user'

interface NavLinkProps {
  isActive: boolean
}

const getLinkClassName = ({ isActive }: NavLinkProps) => {
  let className = `text_type_main-medium text_color_inactive ${styles.profileNavigation_navLink}`
  if (isActive) {
    className += ` ${styles.profileNavigation_navLink_active}`
  }
  return className
}

export function ProfileNavigation () {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.profileNavigation__container}>
      <ul className='text mb-20'>
        <li className={styles.profileNavigation__navElement}>
          <NavLink to='/profile' className={getLinkClassName} end>Профиль</NavLink>
        </li>
        <li className={styles.profileNavigation__navElement}>
          <NavLink to='/profile/orders' className={getLinkClassName} end>История заказов</NavLink>
        </li>
        <li className={styles.profileNavigation__navElement}>
          <button
            type='button'
            onClick={logoutHandler}
            className={`${styles.logout__button} text text_center text_type_main-medium text_color_inactive`}>
            Выход
          </button>
        </li>
      </ul>
      <p className={`${styles.profileNavigation__hint} text text_type_main-default`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  )
}