import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";

export function BunIngredient({bun, position}) {
  const { name, image, price } = bun
  const description = name + (position === 'top' ? ' (верх)' : ' (низ)')
  const marginTop = position === 'bottom' ? 'mt-4' : ''
  const marginBottom = position === 'top' ? 'mb-4': 'mb-10'

  return (
    <div className={`pl-8 ${marginBottom + ' ' + marginTop}`}>
      <ConstructorElement
        text={description}
        thumbnail={image}
        price={price}
        type={position}
        isLocked
      />
    </div>
  )
}