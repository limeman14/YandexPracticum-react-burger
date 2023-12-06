import styles from './ProfilePage.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../services/actions/user'
import { NavLink } from 'react-router-dom'
import { ProfileEditForm } from '../../components/profile/edit-form/ProfileEditForm'

const getLinkClassName = ({ isActive }) => {
  let className = `text_type_main-medium text_color_inactive ${styles.profilePage_navLink}`
  if (isActive) {
    className += ` ${styles.profilePage_navLink_active}`
  }
  return className
}

export function ProfilePage() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.profilePage__container}>
      <div className={styles.profilePage__leftSection}>
        <ul className="text mb-20">
          <li className={styles.profilePage__navElement}>
            <NavLink to="/profile" className={getLinkClassName}>Профиль</NavLink>
          </li>
          <li className={styles.profilePage__navElement}>
            <NavLink to="/profile/orders" className={getLinkClassName}>История заказов</NavLink>
          </li>
          <li className={styles.profilePage__navElement}>
            <button
              type="button"
              onClick={logoutHandler}
              className={`${styles.logout__button} text text_center text_type_main-medium text_color_inactive`}>
              Выход
            </button>
          </li>
        </ul>
        <p className={`${styles.profilePage__hint} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <ProfileEditForm />
    </div>
  )
}