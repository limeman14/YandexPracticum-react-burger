import {IngredientCard} from "./ingredientCard/ingredientCard";

export function IngredientCatalogSection({headingTitle, items}) {
  return (
    <>
      <h2 className='text text_type_main-medium'>{headingTitle}</h2>
      <ul className='pt-6 pr-4 pb-10 pl-4' style={{display: "grid", gridTemplateColumns: '272px 272px', gap: '32px 24px'}}>
        {items.map((item, index) => {
          return <IngredientCard key={index}
                                 imageSrc={item.image}
                                 price={item.price}
                                 name={item.name}
                                 /* temporary count definition for test purpose */
                                 count={index === 0 && 1}/>
        })}
      </ul>
    </>
  )
}