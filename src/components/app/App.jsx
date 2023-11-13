import React, { useEffect } from 'react'
import styles from './App.module.css'
import { AppHeader } from '../app-header/AppHeader'
import { BurgerIngredients } from '../constructor/burger-ingredients/BurgerIngredients'
import { BurgerConstructor } from '../constructor/burger-constructor/BurgerConstructor'
import { useDispatch, useSelector } from 'react-redux'
import { fetchIngredients } from '../../services/actions/burger'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './globalStyles.css'

function App () {
  const { ingredientsRequest, ingredientsError } = useSelector(store => store.burgerIngredients)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  return (
      !ingredientsRequest && !ingredientsError
        ? <div className={styles.pageContainer}>
          <AppHeader/>
          <main className={styles.main__main}>
            <DndProvider backend={HTML5Backend}>
              <section className={styles.main__section}>
                <BurgerIngredients />
              </section>
              <section className={`${styles.main__section} pt-25 pl-4`}>
                <BurgerConstructor />
              </section>
            </DndProvider>
          </main>
        </div>
        : null
  )
}

export default App
