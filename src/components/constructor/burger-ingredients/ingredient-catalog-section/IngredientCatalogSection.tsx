import styles from './IngredientCatalogSection.module.css'
import { IngredientCard } from '../ingredient-card/IngredientCard'
import { forwardRef } from 'react'
import { Ingredient, WithDragId } from '../../../../utils/types/common'

interface IngredientCatalogSectionProps {
  headingTitle: string
  items: ReadonlyArray<WithDragId<Ingredient>>
}

export const IngredientCatalogSection = forwardRef<HTMLHeadingElement, IngredientCatalogSectionProps>((props, ref) => {
  const { headingTitle, items } = props
  return (<>
    <h2 ref={ref} className='text text_type_main-medium'>{headingTitle}</h2>
    <ul className={`${styles.ingredientCards__ul} pt-6 pr-4 pb-10 pl-4`}>
      {items.map(item => {
        return <IngredientCard key={item._id} ingredient={item}/>
      })}
    </ul>
  </>)
})