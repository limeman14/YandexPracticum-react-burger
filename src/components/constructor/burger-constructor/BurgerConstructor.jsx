import { useContext, useMemo } from 'react'
import { BurgerIngredient } from './burger-ingredient/BurgerIngredient'
import { CreateOrderPanel } from './create-order-panel/CreateOrderPanel'
import styles from './BurgerConstructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsContext } from '../../../context/ingredientsContext'

export function BurgerConstructor () {
  const data = useContext(IngredientsContext)

  const { bun, ingredients } = useMemo(() => {
    return {
      bun: data.find(item => item.type === 'bun'),
      ingredients: data.filter(item => item.type !== 'bun'),
    }
  }, [data])

  return (
    <>
      <div className='pl-8 mb-4'>
        <ConstructorElement
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          price={bun.price}
          type='top'
          isLocked
        />
      </div>
      <ul className={`${styles.burgerConstructor__mainIngredientUl} text`}>
        {ingredients.map((ingredient) => {
          return <BurgerIngredient key={ingredient._id} item={ingredient}/>
        })}
      </ul>
      <div className='pl-8 mb-10 mt-4'>
        <ConstructorElement
          text={`${bun.name} (низ)`}
          thumbnail={bun.image}
          price={bun.price}
          type='bottom'
          isLocked
        />
      </div>
      <CreateOrderPanel bun={bun} ingredients={ingredients}/>
    </>
  )
}