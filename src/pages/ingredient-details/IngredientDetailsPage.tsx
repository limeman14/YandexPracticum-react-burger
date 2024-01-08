import styles from './IngredientDetailsPage.module.css'
import { IngredientDetails } from '../../components/constructor/burger-ingredients/ingredient-details/IngredientDetails'

export function IngredientDetailsPage () {
    return (
    <div className={styles.ingredientDetailsPage__container}>
      <h2 className='text text_center text_type_main-large'>Детали ингредиента</h2>
      <IngredientDetails/>
    </div>
  )
}