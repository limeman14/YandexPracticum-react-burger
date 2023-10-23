import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './createOrderPanel.module.css'
import PropTypes from 'prop-types'

export function CreateOrderPanel ({ sum, onCreateOrderClick }) {
  return (
    <div className={`${styles.createOrderPanel__div} pr-4`}>
      <div className={`${styles.createOrderPanel__sumDiv} mr-10`}>
        <span className='text_type_digits-medium pr-2'>{sum}</span>
        <CurrencyIcon type={'primary'} width='36px'/>
      </div>
      <Button htmlType='button' size='large' type='primary' onClick={onCreateOrderClick}>
        Оформить заказ
      </Button>
    </div>
  )
}

CreateOrderPanel.propTypes = {
  sum: PropTypes.number.isRequired,
  onCreateOrderClick: PropTypes.func.isRequired
}