import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './mainIngredient.module.css'
import PropTypes from 'prop-types'

export function MainIngredient ({ item }) {
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

MainIngredient.propTypes = {
  item: PropTypes.object.isRequired
}