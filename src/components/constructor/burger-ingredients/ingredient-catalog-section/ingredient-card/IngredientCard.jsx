import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import { ingredientType } from '../../../../../utils/prop-types'
import { IngredientDetails } from './ingredient-details/IngredientDetails'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from '../../../../../services/actions/burger'
import { useState } from 'react'
import { useDrag } from 'react-dnd'
import { Modal } from "../../../../modal/Modal";

export function IngredientCard ({ ingredient }) {
  const [isIngredientDetailsVisible, setIsIngredientDetailsVisible] = useState(false)

  const dispatch = useDispatch()
  const openIngredientDetails = () => {
    dispatch({
      type: OPEN_INGREDIENT_MODAL,
      ingredient
    })
    setIsIngredientDetailsVisible(true)
  }
  const closeIngredientDetails = () => {
    dispatch({
      type: CLOSE_INGREDIENT_MODAL
    })
    setIsIngredientDetailsVisible(false)
  }

  const [{ opacity}, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const count = useSelector(store => store.burgerIngredients.ingredientCounters[ingredient._id])
  const { image: imageSrc, name, price } = ingredient

  return (
    <>
      {isIngredientDetailsVisible &&
        <Modal closeModal={closeIngredientDetails} title='Детали ингредиента'>
          <IngredientDetails />
        </Modal>}
      <li ref={dragRef} className={styles.ingredientCard__li} onClick={openIngredientDetails} style={{opacity}}>
        {count && <Counter count={count}/>}
        <img ref={dragPreviewRef} src={imageSrc} alt={name} className={`${styles.ingredientCard_img} mb-1 ml-4 mr-4`}/>
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
}