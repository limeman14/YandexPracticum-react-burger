import styles from './IngredientDetails.module.css'
import { NutritionInfoBlock } from '../nutrition-info-block/NutritionInfoBlock'
import { useDispatch, useSelector } from '../../../../utils/types/hooks'
import { useParams } from 'react-router-dom'
import { Ingredient } from '../../../../utils/types/common'
import { useEffect } from 'react'
import { removeIngredientFromModal, setIngredientForModal } from '../../../../services/actions/burger'
import { getBurgerIngredients, getIngredientModal } from '../../../../services/store/selectors'

export function IngredientDetails () {
  const { id } = useParams()
  const ingredient = useSelector(getBurgerIngredients).ingredients
    .find((item: Ingredient) => item._id === id)

  const dispatch = useDispatch()
  useEffect(() => {
    if (ingredient) {
      dispatch(setIngredientForModal(ingredient))
    }

    return () => {
      dispatch(removeIngredientFromModal())
    }
  }, [ingredient, dispatch])

  const currentIngredient = useSelector(getIngredientModal).current
  if (currentIngredient === null) {
    return null
  }
  const { image_large: imageSrc, name, calories, proteins, fat, carbohydrates } = currentIngredient

  return (
    <>
      <img src={imageSrc} alt={name} className={`${styles.ingredientImage} mb-4`}/>
      <span className="text_center text_type_main-medium mb-8">{name}</span>
      <div className={styles.nutritionTable} data-cy='nutrition-table'>
        <NutritionInfoBlock title="Калории, ккал" value={calories}/>
        <NutritionInfoBlock title="Белки, г" value={proteins}/>
        <NutritionInfoBlock title="Жиры, г" value={fat}/>
        <NutritionInfoBlock title="Углеводы, г" value={carbohydrates}/>
      </div>
    </>
  )
}