import { useSelector } from '../../utils/types/hooks'
import { OrderStatus, orderStatusMapping } from '../../utils/types/common'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './OrderFullInfo.module.css'
import { OrderTotalPrice } from '../order-feed/order-card/order-total-price/OrderTotalPrice'
import { useMemo } from 'react'
import { OrderIngredient } from './order-ingredient/OrderIngredient'
import { countBy, uniq } from 'lodash'

export function OrderFullInfo () {
  const orderInfo = useSelector(store => store.orderModal.current)
  const ingredientsCatalog = useSelector(store => store.burgerIngredients.ingredients)

  const orderTotalPrice = useMemo(() => {
    const orderIngredientIds = orderInfo?.ingredients ?? []
    const ingredientPrices = ingredientsCatalog.reduce((prev, next) => {
      prev[next._id] = next.price
      return prev
    }, {} as Record<string, number>)
    return orderIngredientIds.reduce((sum, id) => sum + ingredientPrices[id], 0)
  }, [orderInfo?.ingredients, ingredientsCatalog])

  const orderIngredients = useMemo(() => {
    const orderIngredientIds = orderInfo?.ingredients ?? []
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
  }, [orderInfo?.ingredients, ingredientsCatalog])

  if (orderInfo === null) {
    return null
  }

  const { name, status, createdAt} = orderInfo
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