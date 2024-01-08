import styles from './OrderTotalPrice.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

interface OrderTotalPriceProps {
  totalPrice: number
}

export function OrderTotalPrice ({ totalPrice }: OrderTotalPriceProps) {
  return (
    <div className={styles.orderTotalPrice__div}>
      <span className='text_type_digits-default pr-2'>{totalPrice}</span>
      <CurrencyIcon type={'primary'}/>
    </div>
  )
}