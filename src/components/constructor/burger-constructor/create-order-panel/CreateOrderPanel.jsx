import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './CreateOrderPanel.module.css'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { ingredientType } from '../../../../utils/prop-types'
import { OrderDetails } from './order-details/OrderDetails'
import { createOrder } from '../../../../utils/burger-api'

export function CreateOrderPanel ({ bun, ingredients }) {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false)
  const [orderNumber, setOrderNumber] = useState()

  const closeOrderDetails = () => setIsOrderDetailsVisible(false)

  const sum = useMemo(() => {
    const mainIngredientsSum = ingredients.map(ingredient => ingredient.price).reduce((a, b) => a + b, 0)
    return mainIngredientsSum + 2 * bun.price
  }, [bun, ingredients])

  const createOrder2 = async () => {
    const result = await createOrder([...ingredients, bun])
    setOrderNumber(result.order.number)
    setIsOrderDetailsVisible(true)
  }

  return (
    <>
      {isOrderDetailsVisible && <OrderDetails orderNumber={orderNumber} onClose={closeOrderDetails}/>}
      <div className={`${styles.createOrderPanel__div} pr-4`}>
        <div className={`${styles.createOrderPanel__sumDiv} mr-10`}>
          <span className='text_type_digits-medium pr-2'>{sum}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
        <Button htmlType='button' size='large' type='primary' onClick={createOrder2}>
          Оформить заказ
        </Button>
      </div>
    </>
  )
}

CreateOrderPanel.propTypes = {
  bun: ingredientType.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
}