import styles from './ConstructorPage.module.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerIngredients } from '../../components/constructor/burger-ingredients/BurgerIngredients'
import { BurgerConstructor } from '../../components/constructor/burger-constructor/BurgerConstructor'
import React from 'react'

export function ConstructorPage () {
  return (
    <main className={styles.main__main}>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.main__section}>
          <BurgerIngredients/>
        </section>
        <section className={`${styles.main__section} pt-25 pl-4`}>
          <BurgerConstructor/>
        </section>
      </DndProvider>
    </main>
  )
}