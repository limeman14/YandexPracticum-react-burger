import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { LeftSection } from './leftSection/leftSection'
import { RightSection } from './rightSection/rightSection'

export function AppHeader () {
  return (
    <header className="app-header text text_type_main-default text_color_inactive">
      <nav className='app-header__nav'>
        <LeftSection/>
        <Logo />
        <RightSection/>
      </nav>
    </header>
  )
}