import PropTypes from 'prop-types'
import { Modal } from '../../../../../modal/Modal'
import styles from './IngredientDetails.module.css'
import { NutritionInfoBlock } from './nutrition-info-block/NutritionInfoBlock'
import { useSelector } from 'react-redux'

export function IngredientDetails ({ onClose }) {
  const currentIngredient = useSelector(store => store.ingredientModal.current)
  const { image_large: imageSrc, name, calories, proteins, fat, carbohydrates } = currentIngredient

  return (
    <Modal closeModal={onClose} title='Детали ингредиента'>
      <img src={imageSrc} alt={name} className={`${styles.ingredientImage} mb-4`}/>
      <span className='text_center text_type_main-medium mb-8'>{name}</span>
      <div className={styles.nutritionTable}>
        <NutritionInfoBlock title='Калории, ккал' value={calories}/>
        <NutritionInfoBlock title='Белки, г' value={proteins}/>
        <NutritionInfoBlock title='Жиры, г' value={fat}/>
        <NutritionInfoBlock title='Углеводы, г' value={carbohydrates}/>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  onClose: PropTypes.func.isRequired
}