import styles from './IngredientDetails.module.css'
import { NutritionInfoBlock } from '../nutrition-info-block/NutritionInfoBlock'
import { Ingredient } from '../../../../utils/types/common'
import { useSelector } from '../../../../utils/types/hooks'

export function IngredientDetails () {
  const currentIngredient = useSelector((store) => store.ingredientModal.current) as Ingredient
  const { image_large: imageSrc, name, calories, proteins, fat, carbohydrates } = currentIngredient

  return (
    <>
      <img src={imageSrc} alt={name} className={`${styles.ingredientImage} mb-4`}/>
      <span className='text_center text_type_main-medium mb-8'>{name}</span>
      <div className={styles.nutritionTable}>
        <NutritionInfoBlock title='Калории, ккал' value={calories}/>
        <NutritionInfoBlock title='Белки, г' value={proteins}/>
        <NutritionInfoBlock title='Жиры, г' value={fat}/>
        <NutritionInfoBlock title='Углеводы, г' value={carbohydrates}/>
      </div>
    </>
)
}