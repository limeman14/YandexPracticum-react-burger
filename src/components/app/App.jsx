import React from 'react'
import './App.css'
import { AppHeader } from '../appHeader/appHeader'
import { MainLayout } from '../common/mainLayout/mainLayout'
import { BurgerIngredients } from '../constructor/burgerIngredients/burgerIngredients'
import { data } from '../../utils/data'
import { BurgerConstructor } from '../constructor/burgerConstructor/burgerConstructor'

function App () {
  return (
    <div className='page-container'>
      <AppHeader/>
      <MainLayout>
        <section className='main__section'>
          <BurgerIngredients data={data}/>
        </section>
        <section className='main__section pt-25 pl-4'>
          <BurgerConstructor data={data}/>
        </section>
      </MainLayout>
    </div>
  )
}

export default App
