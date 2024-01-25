import { BurgerIngredient } from './burger-ingredient/BurgerIngredient'
import { CreateOrderPanel } from './create-order-panel/CreateOrderPanel'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import { addToConstructor, incrementCounter, updateConstructorList } from '../../../services/actions/burger'
import { useCallback } from 'react'
import { Ingredient, WithDragId } from '../../../utils/types/common'
import { useDispatch, useSelector } from '../../../utils/types/hooks'
import { getBurgerConstructor } from '../../../services/store/selectors'

export function BurgerConstructor () {
  const constructorIngredients = useSelector(getBurgerConstructor)
  const { bun, mainIngredients: ingredients } = constructorIngredients

  const dispatch = useDispatch()
  const [, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(ingredient: Ingredient) {
      dispatch(addToConstructor(ingredient))
      dispatch(incrementCounter(ingredient))
    }
  })

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex]
    const newMainIngredients = [...ingredients]
    newMainIngredients.splice(dragIndex, 1)
    newMainIngredients.splice(hoverIndex, 0, dragCard)

    dispatch(updateConstructorList(newMainIngredients))
  }, [ingredients, dispatch])

  return (
    <>
      <div ref={dropTargetRef} data-cy='constructor-list'>
        {!bun && ingredients.length === 0 && <div className='pl-8 mb-4 text_type_main-medium text_center'>
          Пожалуйста, перенесите сюда булку и ингридиенты для создания заказа
        </div>}
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
          {ingredients.length > 0 && ingredients.map((ingredient: WithDragId<Ingredient>, index: number) => {
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