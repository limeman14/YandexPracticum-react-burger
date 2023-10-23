import { IngredientCard } from './ingredientCard/ingredientCard'
import styles from './ingredientCatalogSection.module.css'
import PropTypes from 'prop-types'

export function IngredientCatalogSection ({ headingTitle, items }) {
  return (
    <>
      <h2 className='text text_type_main-medium'>{headingTitle}</h2>
      <ul className={`${styles.ingredientCards__ul} pt-6 pr-4 pb-10 pl-4`}>
        {items.map((item, index) => {
          return <IngredientCard key={index}
                                 imageSrc={item.image}
                                 price={item.price}
                                 name={item.name}
            /* temporary count definition for test purpose */
                                 count={index === 0 ? 1 : undefined}/>
        })}
      </ul>
    </>
  )
}

IngredientCatalogSection.propTypes = {
  headingTitle: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}