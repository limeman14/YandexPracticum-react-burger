import styles from './OrderDetails.module.css'
import doneImg from '../../../../images/done.svg'
import { useSelector } from '../../../../utils/types/hooks'
import { getOrder } from '../../../../services/store/selectors'

export function OrderDetails () {
  const orderNumber = useSelector(getOrder).createdOrder
  return (
    <div className={`${styles.orderDetailsModal__div} mt-4`}>
      <span className={`${styles.orderNumber} text_center text_type_digits-large mb-8`}>{orderNumber}</span>
      <span className='text_center text_type_main-medium mb-15'>идентификатор заказа</span>
      <img src={doneImg} alt='Order success' className={`${styles.orderSuccess__img} mb-15`}/>
      <span className='text_center text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text_center text_type_main-default text_color_inactive mb-15'>
          Дождитесь готовности на орбитальной станции
        </span>
    </div>
  )
}