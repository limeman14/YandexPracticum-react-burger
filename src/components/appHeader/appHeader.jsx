import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { LeftSection } from './leftSection/leftSection'
import { RightSection } from './rightSection/rightSection'
import styles from './appHeader.module.css'

export function AppHeader () {
  return (
    <header className={`${styles.appHeader__header} text text_type_main-default text_color_inactive`}>
      <nav className={styles.appHeader__nav}>
        <LeftSection/>
        <Logo/>
        <RightSection/>
      </nav>
    </header>
  )
}