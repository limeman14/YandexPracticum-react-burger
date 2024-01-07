import { OrderInfo, OrderStatus, orderStatusMapping } from '../../../utils/types/common'
import styles from './OrderCard.module.css'
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react'
import { useDispatch, useSelector } from '../../../utils/types/hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { setOrderInfoForModal } from '../../../services/actions/order-info-modal'
import { OrderTotalPrice } from './order-total-price/OrderTotalPrice'

interface OrderCardProps {
  order: OrderInfo
  orderModalPath: string
  withStatus?: boolean
}

const MAX_PREVIEW_ELEMENTS = 5

export function OrderCard ({ order, orderModalPath, withStatus }: OrderCardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { number, createdAt, name, ingredients, status, _id } = order

  const handleOrderCardClick = () => {
    dispatch(setOrderInfoForModal(order))
    navigate(orderModalPath, { state: { background: location } })
  }

  const ingredientsCatalog = useSelector(store => store.burgerIngredients.ingredients)
  const orderTotalPrice = useMemo(() => {
    const ingredientPrices = ingredientsCatalog.reduce((prev, next) => {
      prev[next._id] = next.price
      return prev
    }, {} as Record<string, number>)
    return ingredients.reduce((sum, id) => sum + ingredientPrices[id], 0)
  }, [ingredients, ingredientsCatalog])

  const previewElements = ingredients.slice(0, MAX_PREVIEW_ELEMENTS)
  const extraElementsCount = Math.max(ingredients.length - MAX_PREVIEW_ELEMENTS, 0)

  const statusAdditionalClass = status === OrderStatus.DONE ? 'text_color_success' : ''

  return (
    <li className={styles.orderCard__li} onClick={handleOrderCardClick}>
      <div className={styles.orderCard__header}>
        <span className='text text_type_digits-default'>#{number}</span>
        <FormattedDate date={new Date(createdAt)} className='text text_type_main-default text_color_inactive'/>
      </div>
      <div className={styles.orderCard__main}>
        <span className={`text text_type_main-medium ${styles.orderCard__name}`}>{name}</span>
        {withStatus && <span className={`text text_type_main-default mt-2 ${statusAdditionalClass}`}>{orderStatusMapping[status]}</span>}
      </div>
      <div className={styles.orderCard__footer}>
        <ul className={styles.orderCard__ingredients}>
          {previewElements.map((el, index) => {
            const ingredient = ingredientsCatalog.find(i => i._id === el)!
            return (
              <li key={`${_id}_${el}_${index}`} className={styles.orderCard__ingredients_image} style={{zIndex: 0 - index}}>
                <img src={ingredient.image} alt={ingredient.name}/>
              </li>
            )
          })}
          {extraElementsCount > 0 && <li className={`${styles.orderCard__ingredients_image} text text_type_main-default`} style={{zIndex: -6}}>
            +{extraElementsCount}
          </li>}
        </ul>
        <OrderTotalPrice totalPrice={orderTotalPrice}/>
      </div>
    </li>
  )
}