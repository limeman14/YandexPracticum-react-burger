import styles from './IngredientCatalogSection.module.css'
import { IngredientCard } from '../ingredient-card/IngredientCard'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { ingredientType } from '../../../../utils/prop-types'

export const IngredientCatalogSection = forwardRef((props, ref) => {
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

IngredientCatalogSection.propTypes = {
  headingTitle: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientType.isRequired).isRequired
}