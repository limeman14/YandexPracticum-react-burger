import React from 'react'
import './App.css'
import { AppHeader } from '../appHeader/AppHeader'
import { BurgerIngredients } from '../constructor/burgerIngredients/BurgerIngredients'
import { data } from '../../utils/data'
import { BurgerConstructor } from '../constructor/burgerConstructor/BurgerConstructor'

function App () {
  return (
    <div className='page-container'>
      <AppHeader/>
      <main className='main__main'>
        <section className='main__section'>
          <BurgerIngredients data={data}/>
        </section>
        <section className='main__section pt-25 pl-4'>
          <BurgerConstructor data={data}/>
        </section>
      </main>
    </div>
  )
}

export default App
