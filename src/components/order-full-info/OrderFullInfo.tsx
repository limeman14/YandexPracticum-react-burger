import { RootState, useDispatch, useSelector } from '../../utils/types/hooks'
import { OrderInfo, OrderStatus, orderStatusMapping } from '../../utils/types/common'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './OrderFullInfo.module.css'
import { OrderTotalPrice } from '../order-feed/order-card/order-total-price/OrderTotalPrice'
import { useEffect, useMemo } from 'react'
import { OrderIngredient } from './order-ingredient/OrderIngredient'
import { countBy, uniq } from 'lodash'
import { useParams } from 'react-router-dom'
import { getOrderById, removeOrderInfoFromModal, setOrderInfoForModal } from '../../services/actions/order-info-modal'
import { getBurgerIngredients, getOrderModal } from '../../services/store/selectors'

interface OrderFullInfoProps {
  ordersSelector: (store: RootState) => ReadonlyArray<OrderInfo>
}

export function OrderFullInfo ({ ordersSelector }: OrderFullInfoProps) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const orders = useSelector(ordersSelector)
  const currentOrderFromWs = orders.find(o => o.number.toString() === id)
  const { current: currentOrderInfo, orderInfoRequest, orderInfoError  } = useSelector(getOrderModal)

  useEffect(() => {
    if (currentOrderFromWs) {
      dispatch(setOrderInfoForModal(currentOrderFromWs))
    } else {
      if (id) {
        dispatch(getOrderById(id))
      }
    }
    return () => {
      dispatch(removeOrderInfoFromModal())
    }
  }, [currentOrderFromWs, dispatch, id])

  const ingredientsCatalog = useSelector(getBurgerIngredients).ingredients

  const orderTotalPrice = useMemo(() => {
    const orderIngredientIds = currentOrderInfo?.ingredients ?? []
    const ingredientPrices = ingredientsCatalog.reduce((prev, next) => {
      prev[next._id] = next.price
      return prev
    }, {} as Record<string, number>)
    return orderIngredientIds.reduce((sum, id) => sum + ingredientPrices[id], 0)
  }, [currentOrderInfo?.ingredients, ingredientsCatalog])

  const orderIngredients = useMemo(() => {
    const orderIngredientIds = currentOrderInfo?.ingredients ?? []
    const orderIngredientCounters = countBy(orderIngredientIds)
    return uniq(orderIngredientIds).map(id => {
      const ingredient = ingredientsCatalog.find(ing => ing._id === id)!
      return {
        image: ingredient.image,
        name: ingredient.name,
        price: ingredient.price,
        qty: orderIngredientCounters[id],
      }
    })
  }, [currentOrderInfo?.ingredients, ingredientsCatalog])

  if (orderInfoRequest || orderInfoError || currentOrderInfo === null) {
    return null
  }

  const { name, status, createdAt} = currentOrderInfo
  const statusAdditionalClass = status === OrderStatus.DONE ? 'text_color_success' : ''

  return (
    <>
      <h2 className='text text_type_main-medium mt-10'>{name}</h2>
      <span className={`${statusAdditionalClass} text text_type_main-default mt-3`}>{orderStatusMapping[status]}</span>
      <h2 className='text text_type_main-medium mt-15'>Состав:</h2>
      <ul className={`${styles.orderFullInfo__ingredientList} text mt-6 pr-6`}>
        {orderIngredients.map(ing => <OrderIngredient key={ing.name} {...ing}/>)}
      </ul>
      <div className={`${styles.orderFullInfo__footer} mt-10`}>
        <FormattedDate date={new Date(createdAt)} className='text text_type_main-default text_color_inactive'/>
        <OrderTotalPrice totalPrice={orderTotalPrice}/>
      </div>
    </>
  )
}