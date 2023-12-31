import styles from './IngredientDetailsPage.module.css'
import { useParams } from 'react-router-dom'
import { IngredientDetails } from '../../components/constructor/burger-ingredients/ingredient-details/IngredientDetails'
import { useDispatch, useSelector } from 'react-redux'
import { removeIngredientFromModal, setIngredientForModal } from '../../services/actions/burger'
import { useEffect } from 'react'
import { Ingredient } from '../../utils/types/common'

export function IngredientDetailsPage () {
  const { id } = useParams()
  const ingredient = useSelector((store: any) => store.burgerIngredients.ingredients)
    .find((item: Ingredient) => item._id === id)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIngredientForModal(ingredient))

    return () => {
      dispatch(removeIngredientFromModal())
    }
  }, [ingredient, dispatch])

  const ingredientLoaded = useSelector((store: any) => store.ingredientModal.current)

  return (
    ingredientLoaded && <div className={styles.ingredientDetailsPage__container}>
      <h2 className='text text_center text_type_main-large'>Детали ингредиента</h2>
      <IngredientDetails/>
    </div>
  )
}