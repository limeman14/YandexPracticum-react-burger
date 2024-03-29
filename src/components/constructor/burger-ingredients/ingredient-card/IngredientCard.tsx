import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientCard.module.css'
import { useDrag } from 'react-dnd'
import { useLocation, useNavigate } from 'react-router-dom'
import { Ingredient } from '../../../../utils/types/common'
import { useSelector } from '../../../../utils/types/hooks'
import { getBurgerIngredients } from '../../../../services/store/selectors'

interface IngredientCardProps {
  ingredient: Ingredient
}

export function IngredientCard ({ ingredient }: IngredientCardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { image: imageSrc, name, price, _id: id } = ingredient

  const openIngredientDetails = () => {
    navigate(`/ingredients/${id}`, { state: { background: location } })
  }

  const [{ opacity}, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  const count = useSelector(getBurgerIngredients).ingredientCounters[id]

  return (
    <li ref={dragRef} className={styles.ingredientCard__li} onClick={openIngredientDetails} style={{ opacity }}>
      {count && <Counter count={count}/>}
      <img ref={dragPreviewRef} src={imageSrc} alt={name} className={`${styles.ingredientCard_img} mb-1 ml-4 mr-4`}/>
      <div className={`${styles.ingredientCard__priceDiv} mb-1`}>
        <span className='text_type_digits-default pr-2'>{price}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className='text text_center text_type_main-default'>{name}</p>
    </li>
  )
}