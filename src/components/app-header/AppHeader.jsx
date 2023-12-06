import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { MenuItem } from './menu-item/MenuItem'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../utils/app-routes'

export function AppHeader () {
  const { pathname } = useLocation()

  return (
    <header className={`${styles.appHeader__header} text text_type_main-default text_color_inactive`}>
      <nav className={styles.appHeader__nav}>
        <ul className={styles.appHeader__leftSectionUl}>
          <li>
            <MenuItem
              icon={BurgerIcon}
              text='Конструктор'
              active={pathname === '/'}
            />
          </li>
          <li className='ml-2'>
            <MenuItem
              icon={ListIcon}
              text='Лента заказов'
              active={pathname.includes('/profile/orders')}
            />
          </li>
        </ul>
        <Link to={ROUTES.BASE}>
          <Logo/>
        </Link>
        <div className={styles.appHeader__rightSectionDiv}>
          <MenuItem
            icon={ProfileIcon}
            text='Личный кабинет'
            path='/profile'
            active={pathname === '/profile'}
          />
        </div>
      </nav>
    </header>
  )
}