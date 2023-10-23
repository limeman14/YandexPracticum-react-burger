import { useMemo } from 'react'
import { BunIngredient } from './bunIngredient/BunIngredient'
import { MainIngredient } from './mainIngredient/MainIngredient'
import { CreateOrderPanel } from './createOrderPanel/CreateOrderPanel'
import styles from './BurgerConstructor.module.css'
import PropTypes from 'prop-types'

export function BurgerConstructor ({ data }) {
  const calculateTotalSum = () => {
    const mainIngredientsSum = cart.map(cartItem => cartItem.price)
      .reduce((a, b) => a + b, 0)
    return mainIngredientsSum + 2 * bun.price
  }

  const { bun, cart } = useMemo(() => {
    return {
      bun: data.find(item => item.type === 'bun'),
      cart: data.filter(item => item.type !== 'bun'),
    }
  }, [data])

  return (
    <>
      {<BunIngredient bun={bun} position='top'/>}
      <ul className={`${styles.burgerConstructor__mainIngredientUl} text`}>
        {cart.map((cartItem, index) => {
          return <MainIngredient key={index} item={cartItem}/>
        })}
      </ul>
      <BunIngredient bun={bun} position='bottom'/>
      <CreateOrderPanel sum={calculateTotalSum()} onCreateOrderClick={() => console.log('Order created')}/>
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}