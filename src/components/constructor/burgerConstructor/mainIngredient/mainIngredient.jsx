import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export function MainIngredient({item}) {
  const { name, image, price } = item

  return (
    <li className='mb-4' style={{display: 'flex', alignItems: 'center'}}>
      <DragIcon type='primary'/>
      <ConstructorElement
        text={name}
        thumbnail={image}
        price={price}
        extraClass='ml-2'
      />
    </li>
  )
}