import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import { groupBy } from 'lodash'
import { IngredientCatalogSection } from './ingredient-catalog-section/IngredientCatalogSection'
import styles from './BurgerIngredients.module.css'
import { useSelector } from 'react-redux'
import { Ingredient, IngredientType } from "../../../utils/types/common-types";

interface TabWithRef {
  name: string,
  ref: RefObject<HTMLHeadingElement>
  title: string
}

export function BurgerIngredients () {
  const [currentTab, setCurrentTab] = useState<string>(IngredientType.BUN)

  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const bunRef = useRef<HTMLHeadingElement>(null)
  const sauceRef = useRef<HTMLHeadingElement>(null)
  const mainRef = useRef<HTMLHeadingElement>(null)

  const tabs: TabWithRef[] = useMemo(() => [
    { name: IngredientType.BUN, ref: bunRef, title: 'Булки' },
    { name: IngredientType.SAUCE, ref: sauceRef, title: 'Соусы' },
    { name: IngredientType.MAIN, ref: mainRef, title: 'Начинки' },
  ], [])

  const onTabClick = (tabName: string) => {
    setCurrentTab(tabName)
    tabs.find(tab => tab.name === tabName)?.ref.current
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const onIngredientsScroll = useCallback(() => {
    const containerTop = tabsContainerRef.current?.getBoundingClientRect().top!
    const closestHeading = tabs.reduce((closestHeading, heading) => {
      const offsetTop = heading.ref.current?.getBoundingClientRect().top! - containerTop
      const closestOffset = closestHeading.ref.current?.getBoundingClientRect().top! - containerTop

      if (closestOffset < 0 || offsetTop < closestOffset) {
        return heading
      }
      return closestHeading
    }, tabs[0])

    setCurrentTab(closestHeading.name)
  }, [tabs])

  const data = useSelector((store: any) => store.burgerIngredients.ingredients)
  const { bun, sauce, main } = groupBy(data, (ingredient: Ingredient) => ingredient.type)

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