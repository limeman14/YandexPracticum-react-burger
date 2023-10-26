import { Modal } from '../../../../modal/Modal'
import styles from './OrderDetails.module.css'
import PropTypes from 'prop-types'
import doneImg from '../../../../../images/done.svg'

export function OrderDetails ({ orderNumber, onClose }) {
  return (
    <Modal closeModal={onClose}>
      <div className={`${styles.orderDetailsModal__div} mt-4`}>
        <span className={`${styles.orderNumber} text_center text_type_digits-large mb-8`}>{orderNumber}</span>
        <span className='text_center text_type_main-medium mb-15'>идентификатор заказа</span>
        <img src={doneImg} alt='Order success' className={`${styles.orderSuccess__img} mb-15`}/>
        <span className='text_center text_type_main-default mb-2'>Ваш заказ начали готовить</span>
        <span className='text_center text_type_main-default text_color_inactive mb-15'>
          Дождитесь готовности на орбитальной станции
        </span>
      </div>
    </Modal>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}