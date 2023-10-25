import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredient.module.css'
import { ingredientType } from '../../../../utils/prop-types'

export function BurgerIngredient ({ item }) {
  const { name, image, price } = item

  return (
    <li className={`${styles.mainIngredientCard__li} mb-4`}>
      <DragIcon type='primary'/>
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        extraClass='ml-2'
      />
    </li>
  )
}

BurgerIngredient.propTypes = {
  item: ingredientType.isRequired
}