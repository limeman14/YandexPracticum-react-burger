import { useState } from 'react'
import { BunIngredient } from './bunIngredient/bunIngredient'
import { MainIngredient } from './mainIngredient/mainIngredient'
import { CreateOrderPanel } from './createOrderPanel/createOrderPanel'
import styles from './burgerConstructor.module.css'
import PropTypes from 'prop-types'

export function BurgerConstructor ({ data }) {
  const findIngredientById = (id) => data.find(el => el._id === id)
  const calculateTotalSum = () => {
    const mainIngredientSum = cart.map(id => findIngredientById(id).price)
      .reduce((a, b) => a + b, 0)
    return mainIngredientSum + 2 * bun.price
  }

  // eslint-disable-next-line no-unused-vars
  const [bun, setBun] = useState(findIngredientById('60666c42cc7b410027a1a9b1'))
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState(['60666c42cc7b410027a1a9b9', '60666c42cc7b410027a1a9b4',
    '60666c42cc7b410027a1a9bc', '60666c42cc7b410027a1a9bb', '60666c42cc7b410027a1a9bb', '60666c42cc7b410027a1a9b6'])

  return (
    <>
      <BunIngredient bun={bun} position='top'/>
      <ul className={`${styles.burgerConstructor__mainIngredientUl} text`}>
        {cart.map((cartItemId, index) => {
          const cartItem = findIngredientById(cartItemId)
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