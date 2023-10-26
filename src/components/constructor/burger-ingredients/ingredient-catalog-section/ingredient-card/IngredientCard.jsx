import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../../../utils/prop-types'
import { useState } from 'react'
import { IngredientDetails } from './ingredient-details/IngredientDetails'

export function IngredientCard ({ ingredient, count }) {
  const [isIngredientDetailsVisible, setIsIngredientDetailsVisible] = useState(false)

  const openIngredientDetails = () => setIsIngredientDetailsVisible(true)
  const closeIngredientDetails = () => setIsIngredientDetailsVisible(false)

  const { image: imageSrc, name, price } = ingredient
  return (
    <>
      {isIngredientDetailsVisible && <IngredientDetails ingredient={ingredient} onClose={closeIngredientDetails}/>}
      <li className={styles.ingredientCard__li} onClick={openIngredientDetails}>
        {count && <Counter count={count}/>}
        <img src={imageSrc} alt={name} className='mb-1 ml-4 mr-4'/>
        <div className={`${styles.ingredientCard__priceDiv} mb-1`}>
          <span className='text_type_digits-default pr-2'>{price}</span>
          <CurrencyIcon type={'primary'}/>
        </div>
        <p className='text text_center text_type_main-default'>{name}</p>
      </li>
    </>
  )
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number
}