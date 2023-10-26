import React, { useEffect, useState } from 'react'
import './App.css'
import { AppHeader } from '../app-header/AppHeader'
import { BurgerIngredients } from '../constructor/burger-ingredients/BurgerIngredients'
import { BurgerConstructor } from '../constructor/burger-constructor/BurgerConstructor'

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients'

function App () {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(dataUrl)
        .then(resp => {
          if (resp.status === 200) {
            return resp.json()
          }
        })
        .catch(err => {
          console.log(err)
          return { data: [] }
        })

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
            <BurgerConstructor data={data}/>
          </section>
        </main>
      </div>
      : null
  )
}

export default App
