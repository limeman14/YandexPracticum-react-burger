import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useMemo, useRef, useState } from 'react'
import { groupBy } from 'lodash'
import { IngredientCatalogSection } from './ingredient-catalog-section/IngredientCatalogSection'
import styles from './BurgerIngredients.module.css'
import { useSelector } from 'react-redux'

export function BurgerIngredients () {
  const [currentTab, setCurrentTab] = useState('bun')

  const tabsContainerRef = useRef()
  const bunRef = useRef()
  const sauceRef = useRef()
  const mainRef = useRef()

  const tabs = useMemo(() => [
    { name: 'bun', ref: bunRef, title: 'Булки' },
    { name: 'sauce', ref: sauceRef, title: 'Соусы' },
    { name: 'main', ref: mainRef, title: 'Начинки' },
  ], [])

  const onTabClick = (tabName) => {
    setCurrentTab(tabName)
    tabs.find(tab => tab.name === tabName).ref.current
      ?.scrollIntoView({behavior: 'smooth'})
  }

  const onIngredientsScroll = useCallback(() => {
    const containerTop = tabsContainerRef.current?.getBoundingClientRect().top
    const closestHeading = tabs.reduce((closestHeading, heading) => {
      const offsetTop = heading.ref.current?.getBoundingClientRect().top - containerTop
      const closestOffset = closestHeading.ref.current?.getBoundingClientRect().top - containerTop

      if (closestOffset < 0 || offsetTop < closestOffset) {
        return heading
      }
      return closestHeading
    }, tabs[0])

    setCurrentTab(closestHeading.name)
  }, [tabs])

  const data = useSelector(store => store.burgerIngredients.ingredients)
  const { bun, sauce, main } = groupBy(data, ingredient => ingredient.type)

  return (
    <>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={`${styles.ingredientTabs__div} mt-5`} ref={tabsContainerRef}>
        {tabs.map(({ title, name }) => {
          return <Tab
            key={name}
            active={currentTab === name}
            value={name}
            onClick={onTabClick}
            children={title}/>
        })}
      </div>
      <div className={`mt-10 ${styles.catalogSection__div}`} onScroll={onIngredientsScroll}>
        <IngredientCatalogSection ref={bunRef} headingTitle={'Булки'} items={bun}/>
        <IngredientCatalogSection ref={sauceRef} headingTitle={'Соусы'} items={sauce}/>
        <IngredientCatalogSection ref={mainRef} headingTitle={'Начинки'} items={main}/>
      </div>
    </>
  )
}