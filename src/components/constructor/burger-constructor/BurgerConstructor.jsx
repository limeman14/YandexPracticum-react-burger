import { BurgerIngredient } from './burger-ingredient/BurgerIngredient'
import { CreateOrderPanel } from './create-order-panel/CreateOrderPanel'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'
import { ADD_INGREDIENT, INCREMENT_INGREDIENT_COUNTER, UPDATE_CONSTRUCTOR_LIST } from '../../../services/actions/burger'
import { useCallback } from 'react'

export function BurgerConstructor () {
  const constructorIngredients = useSelector(store => store.burgerConstructor)
  const { bun, mainIngredients: ingredients } = constructorIngredients

  const dispatch = useDispatch()
  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {
          ...ingredient,
          dragId: Math.random()
        }
      })
      dispatch({
        type: INCREMENT_INGREDIENT_COUNTER,
        ingredient
      })
    }
  })

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex]
    const newMainIngredients = [...ingredients]
    newMainIngredients.splice(dragIndex, 1)
    newMainIngredients.splice(hoverIndex, 0, dragCard)

    dispatch({
      type: UPDATE_CONSTRUCTOR_LIST,
      newMainIngredients,
    })
  }, [ingredients, dispatch])

  return (
    <>
      <div ref={dropTargetRef}>
        <section className='pl-8 mb-4'>
          {bun && <ConstructorElement
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
            type='top'
            isLocked
          />}
        </section>
        <ul className={`${styles.burgerConstructor__mainIngredientUl} text`}>
          {ingredients.length > 0 && ingredients.map((ingredient, index) => {
            return <BurgerIngredient
              key={ingredient.dragId}
              index={index}
              ingredient={ingredient}
              moveCard={moveCard}
            />
          })}
        </ul>
        <section className='pl-8 mb-10 mt-4'>
          {bun && <ConstructorElement
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
            type='bottom'
            isLocked
          />}
        </section>
      </div>
      <CreateOrderPanel/>
    </>
  )
}