import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import PropTypes from 'prop-types'

export function IngredientCard ({ imageSrc, price, name, count }) {
  return (
    <li className={styles.ingredientCard__li}>
      {count && <Counter count={count}/>}
      <img src={imageSrc} alt={name} className='mb-1 ml-4 mr-4'/>
      <div className={`${styles.ingredientCard__priceDiv} mb-1`}>
        <span className='text_type_digits-default pr-2'>{price}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className='text text_center text_type_main-default'>{name}</p>
    </li>
  )
}

IngredientCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number
}