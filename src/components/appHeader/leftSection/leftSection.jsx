import React from 'react'
import {MenuItem} from "../menuItem/menuItem";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './leftSection.module.css';

export function LeftSection() {
  return (
    <ul className={styles.listItems}>
      <li>
        <MenuItem
          icon={<BurgerIcon type={"primary"}/>}
          text='Конструктор'
          active
        />
      </li>
      <li className='ml-2'>
        <MenuItem
          icon={<ListIcon type={"secondary"}/>}
          text='Лента заказов'
        />
      </li>
    </ul>
  )
}