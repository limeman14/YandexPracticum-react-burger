import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useState} from "react";
import _ from "lodash";
import {IngredientCatalogSection} from "../ingredientCatalogSection/ingredientCatalogSection";
import styles from './burgerIngredients.module.css';

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

export function BurgerIngredients({data}) {
  const [currentTab, setCurrentTab] = useState('bun')

  const { bun, sauce, main} = _.groupBy(data, ing => ing.type)

  console.log(styles)

  return (
    <>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className='mt-5' style={{display: 'flex'}}>
        {tabs.map(({title, value}) => {
          return <Tab
            key={value}
            active={currentTab === value}
            value={value}
            onClick={setCurrentTab}
            children={title}/>
        })}
      </div>
      <div className={`mt-10 ${styles.catalogSectionContainer}`}>
        <IngredientCatalogSection headingTitle={'Булки'} items={bun}/>
        <IngredientCatalogSection headingTitle={'Соусы'} items={sauce}/>
        <IngredientCatalogSection headingTitle={'Начинки'} items={main}/>
      </div>
    </>
  )
}