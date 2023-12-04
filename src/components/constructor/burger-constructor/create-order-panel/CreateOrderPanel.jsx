import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './CreateOrderPanel.module.css'
import { useCallback, useMemo, useState } from 'react'
import { OrderDetails } from '../order-details/OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { closeOrderModal, createOrder } from '../../../../services/actions/burger'
import { Modal } from '../../../modal/Modal'
import { useLocation, useNavigate } from 'react-router-dom'

const mapIngredientsToIds = (ingredients) => {
  return ingredients.map(i => i._id)
}

export function CreateOrderPanel () {
  const [isOrderDetailsVisible, setIsOrderDetailsVisible] = useState(false)

  const { bun, mainIngredients: ingredients } = useSelector(store => store.burgerConstructor)
  const { isAuthenticated } = useSelector(store => store.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const createOrderHandler = useCallback(() => {
    if (isAuthenticated) {
      dispatch(createOrder(mapIngredientsToIds([bun, bun, ...ingredients])))
      setIsOrderDetailsVisible(true)
    } else {
      navigate('/login', { state: { from: location } })
    }
  }, [bun, ingredients, dispatch, isAuthenticated, location, navigate])

  const { createOrderRequest, createOrderError } = useSelector(store => store.order)
  const closeOrderDetails = () => {
    dispatch(closeOrderModal())
    setIsOrderDetailsVisible(false)
  }

  const sum = useMemo(() => {
    const mainIngredientsSum = ingredients.map(ingredient => ingredient.price).reduce((a, b) => a + b, 0)
    return mainIngredientsSum + 2 * (bun?.price ?? 0)
  }, [bun, ingredients])

  return (
    <>
      {(!createOrderRequest && !createOrderError && isOrderDetailsVisible) &&
        <Modal closeModal={closeOrderDetails}>
          <OrderDetails/>
        </Modal>}
      <div className={`${styles.createOrderPanel__div} pr-4`}>
        <div className={`${styles.createOrderPanel__sumDiv} mr-10`}>
          <span className='text_type_digits-medium pr-2'>{sum}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
        <Button disabled={!bun} htmlType='button' size='large' type='primary' onClick={createOrderHandler}>
          Оформить заказ
        </Button>
      </div>
    </>
  )
}