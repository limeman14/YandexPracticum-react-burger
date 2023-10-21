import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function IngredientCard({imageSrc, price, name}) {
  return (
    <li style={{display: "flex", flexDirection: "column", minHeight: '208px'}}>
      <img src={imageSrc} alt={name} className='mb-1'/>
      <div style={{display: "flex", justifyContent: 'center'}} className='mb-1'>
        <span className='text_type_digits-default'>{price}</span>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className='text text_type_main-default' style={{textAlign: 'center'}}>{name}</p>
    </li>
  )
}