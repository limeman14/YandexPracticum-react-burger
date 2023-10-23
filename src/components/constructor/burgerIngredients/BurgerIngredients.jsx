import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from 'react'
import { groupBy } from 'lodash'
import { IngredientCatalogSection } from './ingredientCatalogSection/IngredientCatalogSection'
import styles from './BurgerIngredients.module.css'
import PropTypes from 'prop-types'

const tabs = [
  {
    value: 'bun',
    title: 'Булки'
  },
  {
    value: 'sauce',
    title: 'Соусы'
  },
  {
    value: 'main',
    title: 'Начинки'
  }
]

export function BurgerIngredients ({ data }) {
  const [currentTab, setCurrentTab] = useState('bun')

  const { bun, sauce, main } = groupBy(data, ingredient => ingredient.type)

  return (
    <>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={`${styles.ingredientTabs__div} mt-5`}>
        {tabs.map(({ title, value }) => {
          return <Tab
            key={value}
            active={currentTab === value}
            value={value}
            onClick={setCurrentTab}
            children={title}/>
        })}
      </div>
      <div className={`mt-10 ${styles.catalogSection__div}`}>
        <IngredientCatalogSection headingTitle={'Булки'} items={bun}/>
        <IngredientCatalogSection headingTitle={'Соусы'} items={sauce}/>
        <IngredientCatalogSection headingTitle={'Начинки'} items={main}/>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.array.isRequired
}