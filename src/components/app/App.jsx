import React, { useEffect, useState } from 'react'
import './App.css'
import { AppHeader } from '../app-header/AppHeader'
import { BurgerIngredients } from '../constructor/burger-ingredients/BurgerIngredients'
import { BurgerConstructor } from '../constructor/burger-constructor/BurgerConstructor'
import { getIngredients } from '../../utils/burger-api'
import { IngredientsContext } from '../../context/ingredientsContext'

function App () {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getIngredients()
      setData(result.data)
      setIsLoadingCompleted(true)
    }

    fetchData()
  }, [])

  return (
    isLoadingCompleted
      ? <div className='page-container'>
        <AppHeader/>
        <main className='main__main'>
          <section className='main__section'>
            <BurgerIngredients data={data}/>
          </section>
          <section className='main__section pt-25 pl-4'>
            <IngredientsContext.Provider value={data}>
              <BurgerConstructor/>
            </IngredientsContext.Provider>
          </section>
        </main>
      </div>
      : null
  )
}

export default App
