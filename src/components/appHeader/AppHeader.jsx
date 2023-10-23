import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import { MenuItem } from './menuItem/MenuItem'

export function AppHeader () {
  return (
    <header className={`${styles.appHeader__header} text text_type_main-default text_color_inactive`}>
      <nav className={styles.appHeader__nav}>
        <ul className={styles.appHeader__leftSectionUl}>
          <li>
            <MenuItem
              icon={<BurgerIcon type={'primary'}/>}
              text='Конструктор'
              active
            />
          </li>
          <li className='ml-2'>
            <MenuItem
              icon={<ListIcon type={'secondary'}/>}
              text='Лента заказов'
            />
          </li>
        </ul>
        <Logo/>
        <div className={styles.appHeader__rightSectionDiv}>
          <MenuItem
            icon={<ProfileIcon type='secondary'/>}
            text='Личный кабинет'
          />
        </div>
      </nav>
    </header>
  )
}