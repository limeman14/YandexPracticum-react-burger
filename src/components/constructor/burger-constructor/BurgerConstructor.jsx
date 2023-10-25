import { useMemo } from 'react'
import { BurgerIngredient } from './burger-ingredient/BurgerIngredient'
import { CreateOrderPanel } from './create-order-panel/CreateOrderPanel'
import styles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientType } from '../../../utils/prop-types'

export function BurgerConstructor ({ data }) {
  const { bun, ingredients } = useMemo(() => {
    return {
      bun: data.find(item => item.type === 'bun'),
      ingredients: data.filter(item => item.type !== 'bun'),
    }
  }, [data])

  const totalSum = useMemo(() => {
    const mainIngredientsSum = ingredients.map(cartItem => cartItem.price).reduce((a, b) => a + b, 0);
    return mainIngredientsSum + 2 * bun.price;
  }, [ingredients, bun])

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
        {ingredients.map((cartItem) => {
          return <BurgerIngredient key={cartItem._id} item={cartItem}/>
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
      <CreateOrderPanel sum={totalSum} onCreateOrderClick={() => console.log('Order created')}/>
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}