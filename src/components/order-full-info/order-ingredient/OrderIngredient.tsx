import styles from './OrderIngredient.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface OrderIngredientProps {
  image: string
  name: string
  price: number
  qty: number
}

export function OrderIngredient ({ image, name, price, qty }: OrderIngredientProps) {
  return (
    <li className={styles.orderIngredient__li}>
      <div className={styles.orderIngredient__image}>
        <img src={image} alt={name}/>
      </div>
      <h3 className='text text_type_main-default'>{name}</h3>
      <div className={styles.orderIngredient__priceQty}>
        <span className='text_type_digits-default pr-2'>{`${qty} x ${price}`}</span>
        <CurrencyIcon type='primary'/>
      </div>
    </li>
  )
}